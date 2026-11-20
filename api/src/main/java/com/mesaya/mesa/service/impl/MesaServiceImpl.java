package com.mesaya.mesa.service.impl;

import com.mesaya.entity.Mesa;
import com.mesaya.entity.Mesa.EstadoMesa;
import com.mesaya.entity.Pedido.EstadoPedido;
import com.mesaya.exception.BusinessException;
import com.mesaya.exception.ResourceNotFoundException;
import com.mesaya.mesa.dto.MesaRequestDTO;
import com.mesaya.mesa.dto.MesaResponseDTO;
import com.mesaya.mesa.service.interfaz.IMesaService;
import com.mesaya.repository.MesaRepository;
import com.mesaya.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MesaServiceImpl implements IMesaService {

	private final MesaRepository  mesaRepository;
	private final PedidoRepository pedidoRepository;

	@Override
	@Transactional(readOnly = true)
	public List<MesaResponseDTO> listar(EstadoMesa estado) {
		List<Mesa> lista = (estado != null)
				? mesaRepository.findByEstadoOrderByNumeroAsc(estado)
				: mesaRepository.findAllByOrderByNumeroAsc();
		return lista.stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public MesaResponseDTO obtenerPorId(Long id) {
		return toDTO(buscar(id));
	}

	@Override
	@Transactional
	public MesaResponseDTO crear(MesaRequestDTO dto) {
		if (mesaRepository.existsByNumero(dto.getNumero()))
			throw new BusinessException("Ya existe una mesa con el número " + dto.getNumero());
		if (dto.getEstado() == EstadoMesa.OCUPADA)
			throw new BusinessException("Una mesa queda ocupada al crearle un pedido.");
		Mesa m = new Mesa();
		mapear(dto, m);
		return toDTO(mesaRepository.save(m));
	}

	@Override
	@Transactional
	public MesaResponseDTO actualizar(Long id, MesaRequestDTO dto) {
		Mesa m = buscar(id);
		if (mesaRepository.existsByNumeroAndIdMesaNot(dto.getNumero(), id))
			throw new BusinessException("Ya existe otra mesa con el número " + dto.getNumero());
		validarEstado(m.getEstado(), dto.getEstado(), id);
		mapear(dto, m);
		return toDTO(mesaRepository.save(m));
	}

	/** El estado OCUPADA lo manejan los pedidos: no se pone ni se quita a mano mientras haya uno activo. */
	private void validarEstado(EstadoMesa actual, EstadoMesa nuevo, Long idMesa) {
		if (nuevo == null || nuevo == actual) return;
		if (nuevo == EstadoMesa.OCUPADA)
			throw new BusinessException("Una mesa queda ocupada al crearle un pedido.");
		if (actual == EstadoMesa.OCUPADA && pedidoRepository.existsByMesaIdMesaAndEstadoIn(
				idMesa, List.of(EstadoPedido.CREADA, EstadoPedido.EN_PREPARACION)))
			throw new BusinessException("La mesa tiene un pedido activo. Entrégalo o elimínalo para liberarla.");
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		buscar(id);
		boolean activa = pedidoRepository.existsByMesaIdMesaAndEstadoIn(
				id, List.of(EstadoPedido.CREADA, EstadoPedido.EN_PREPARACION));
		if (activa)
			throw new BusinessException("La mesa tiene pedidos activos y no puede eliminarse.");
		if (pedidoRepository.existsByMesaIdMesa(id))
			throw new BusinessException("La mesa tiene pedidos en el historial y no puede eliminarse.");
		mesaRepository.deleteById(id);
	}

	private Mesa buscar(Long id) {
		return mesaRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Mesa no encontrada: " + id));
	}

	private void mapear(MesaRequestDTO dto, Mesa m) {
		m.setNumero(dto.getNumero());
		m.setCapacidad(dto.getCapacidad());
		m.setEstado(dto.getEstado() != null ? dto.getEstado() : EstadoMesa.DISPONIBLE);
	}

	private MesaResponseDTO toDTO(Mesa m) {
		return new MesaResponseDTO(m.getIdMesa(), m.getNumero(), m.getCapacidad(), m.getEstado());
	}
}
