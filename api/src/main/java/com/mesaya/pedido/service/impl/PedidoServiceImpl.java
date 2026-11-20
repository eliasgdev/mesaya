package com.mesaya.pedido.service.impl;

import com.mesaya.entity.*;
import com.mesaya.entity.Mesa.EstadoMesa;
import com.mesaya.entity.Pedido.EstadoPedido;
import com.mesaya.exception.BusinessException;
import com.mesaya.exception.ResourceNotFoundException;
import com.mesaya.pedido.dto.AgregarDetalleRequestDTO;
import com.mesaya.pedido.dto.PedidoRequestDTO;
import com.mesaya.pedido.dto.PedidoResponseDTO;
import com.mesaya.pedido.service.interfaz.IPedidoService;
import com.mesaya.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements IPedidoService {

	private final PedidoRepository         pedidoRepository;
	private final MesaRepository           mesaRepository;
	private final ClienteRepository        clienteRepository;
	private final UsuarioRepository        usuarioRepository;
	private final ProductoRepository       productoRepository;
	private final DetallePedidoRepository  detallePedidoRepository;

	@Override
	@Transactional(readOnly = true)
	public List<PedidoResponseDTO> listar(EstadoPedido estado) {
		List<Pedido> lista = (estado != null)
				? pedidoRepository.findByEstadoOrderByFechaCreacionDesc(estado)
				: pedidoRepository.findAllByOrderByFechaCreacionDesc();
		return lista.stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public PedidoResponseDTO obtenerPorId(Long id) {
		return toDTO(buscar(id));
	}

	@Override
	@Transactional
	public PedidoResponseDTO crear(PedidoRequestDTO dto, Long idUsuario) {
		Mesa mesa = mesaRepository.findById(dto.getIdMesa())
				.orElseThrow(() -> new ResourceNotFoundException("Mesa no encontrada: " + dto.getIdMesa()));

		if (mesa.getEstado() == EstadoMesa.OCUPADA)
			throw new BusinessException("La mesa " + mesa.getNumero() + " ya está ocupada.");

		Usuario usuario = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + idUsuario));

		Cliente cliente = null;
		if (dto.getIdCliente() != null) {
			cliente = clienteRepository.findById(dto.getIdCliente())
					.orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado: " + dto.getIdCliente()));
		}

		Pedido pedido = new Pedido();
		pedido.setMesa(mesa);
		pedido.setCliente(cliente);
		pedido.setUsuario(usuario);
		pedido.setObservaciones(dto.getObservaciones());
		pedido.setEstado(EstadoPedido.CREADA);

		Pedido guardado = pedidoRepository.save(pedido);

		for (PedidoRequestDTO.ItemRequest item : dto.getItems()) {
			Producto producto = productoRepository.findById(item.getIdProducto())
					.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + item.getIdProducto()));
			if (!producto.getDisponible())
				throw new BusinessException("El producto '" + producto.getNombre() + "' no está disponible.");

			DetallePedido detalle = new DetallePedido();
			detalle.setPedido(guardado);
			detalle.setProducto(producto);
			detalle.setCantidad(item.getCantidad());
			detalle.setPrecioUnitario(producto.getPrecio());
			detalle.setSubtotal(producto.getPrecio() * item.getCantidad());
			guardado.getDetalles().add(detalle);
		}

		mesa.setEstado(EstadoMesa.OCUPADA);
		mesaRepository.save(mesa);

		return toDTO(pedidoRepository.save(guardado));
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		Pedido pedido = buscar(id);
		if (pedido.getEstado() != EstadoPedido.CREADA)
			throw new BusinessException("Solo se pueden eliminar pedidos en estado CREADA.");
		pedido.getMesa().setEstado(EstadoMesa.DISPONIBLE);
		mesaRepository.save(pedido.getMesa());
		pedidoRepository.deleteById(id);
	}

	@Override
	@Transactional
	public PedidoResponseDTO avanzarEstado(Long id) {
		Pedido pedido = buscar(id);
		EstadoPedido siguiente = pedido.getEstado().siguiente();
		pedido.setEstado(siguiente);

		if (siguiente == EstadoPedido.ENTREGADA) {
			pedido.getMesa().setEstado(EstadoMesa.DISPONIBLE);
			mesaRepository.save(pedido.getMesa());
		}
		return toDTO(pedidoRepository.save(pedido));
	}

	@Override
	@Transactional
	public PedidoResponseDTO agregarDetalle(Long idPedido, AgregarDetalleRequestDTO dto) {
		Pedido pedido = buscar(idPedido);
		if (pedido.getEstado() == EstadoPedido.ENTREGADA)
			throw new BusinessException("No se pueden agregar productos a un pedido entregado.");
		Producto producto = productoRepository.findById(dto.getIdProducto())
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + dto.getIdProducto()));
		if (!producto.getDisponible())
			throw new BusinessException("El producto '" + producto.getNombre() + "' no está disponible.");

		DetallePedido detalle = new DetallePedido();
		detalle.setPedido(pedido);
		detalle.setProducto(producto);
		detalle.setCantidad(dto.getCantidad());
		detalle.setPrecioUnitario(producto.getPrecio());
		detalle.setSubtotal(producto.getPrecio() * dto.getCantidad());
		pedido.getDetalles().add(detalle);

		return toDTO(pedidoRepository.save(pedido));
	}

	@Override
	@Transactional
	public PedidoResponseDTO eliminarDetalle(Long idPedido, Long idDetalle) {
		Pedido pedido = buscar(idPedido);
		if (pedido.getEstado() != EstadoPedido.CREADA)
			throw new BusinessException("Solo se pueden quitar ítems de pedidos en estado CREADA.");

		// Se busca dentro del mismo pedido para no poder borrar ítems de otro pedido.
		DetallePedido detalle = pedido.getDetalles().stream()
				.filter(d -> d.getIdDetalle().equals(idDetalle))
				.findFirst()
				.orElseThrow(() -> new ResourceNotFoundException("Detalle no encontrado: " + idDetalle));
		if (pedido.getDetalles().size() == 1)
			throw new BusinessException("El pedido debe tener al menos un producto. Si ya no lo necesitas, elimínalo.");

		pedido.getDetalles().remove(detalle);
		return toDTO(pedidoRepository.save(pedido));
	}

	private Pedido buscar(Long id) {
		return pedidoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado: " + id));
	}

	private PedidoResponseDTO toDTO(Pedido p) {
		List<PedidoResponseDTO.DetalleResponse> detalles = p.getDetalles().stream()
				.map(d -> new PedidoResponseDTO.DetalleResponse(
						d.getIdDetalle(),
						d.getProducto().getIdProducto(),
						d.getProducto().getNombre(),
						d.getCantidad(),
						d.getPrecioUnitario(),
						d.getSubtotal()))
				.collect(Collectors.toList());

		double total = p.getDetalles().stream()
				.mapToDouble(DetallePedido::getSubtotal).sum();

		return new PedidoResponseDTO(
				p.getIdPedido(),
				p.getMesa().getIdMesa(),
				p.getMesa().getNumero(),
				p.getCliente() != null ? p.getCliente().getIdCliente() : null,
				p.getCliente() != null ? p.getCliente().getNombre()   : null,
				p.getUsuario().getIdUsuario(),
				p.getUsuario().getNombre(),
				p.getFechaCreacion(),
				p.getEstado(),
				p.getObservaciones(),
				total,
				detalles);
	}
}
