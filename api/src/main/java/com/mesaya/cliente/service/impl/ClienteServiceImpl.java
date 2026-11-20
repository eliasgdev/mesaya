package com.mesaya.cliente.service.impl;

import com.mesaya.cliente.dto.ClienteRequestDTO;
import com.mesaya.cliente.dto.ClienteResponseDTO;
import com.mesaya.cliente.service.interfaz.IClienteService;
import com.mesaya.entity.Cliente;
import com.mesaya.exception.BusinessException;
import com.mesaya.exception.ResourceNotFoundException;
import com.mesaya.repository.ClienteRepository;
import com.mesaya.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements IClienteService {

	private final ClienteRepository clienteRepository;
	private final PedidoRepository pedidoRepository;

	@Override
	@Transactional(readOnly = true)
	public List<ClienteResponseDTO> listar(String busqueda) {
		List<Cliente> lista = (busqueda != null && !busqueda.isBlank())
				? clienteRepository.buscarPorNombreOEmail(busqueda)
				: clienteRepository.findAll();
		return lista.stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public ClienteResponseDTO obtenerPorId(Long id) {
		return toDTO(buscar(id));
	}

	@Override
	@Transactional
	public ClienteResponseDTO crear(ClienteRequestDTO dto) {
		if (clienteRepository.existsByEmail(dto.getEmail()))
			throw new BusinessException("Ya existe un cliente con el correo: " + dto.getEmail());
		Cliente c = new Cliente();
		mapear(dto, c);
		return toDTO(clienteRepository.save(c));
	}

	@Override
	@Transactional
	public ClienteResponseDTO actualizar(Long id, ClienteRequestDTO dto) {
		Cliente c = buscar(id);
		if (!c.getEmail().equalsIgnoreCase(dto.getEmail())
				&& clienteRepository.existsByEmail(dto.getEmail()))
			throw new BusinessException("Ya existe otro cliente con el correo: " + dto.getEmail());
		mapear(dto, c);
		return toDTO(clienteRepository.save(c));
	}

	@Override
	@Transactional
	public void eliminar(Long id) {
		buscar(id);
		if (pedidoRepository.existsByClienteIdCliente(id))
			throw new BusinessException("El cliente tiene pedidos registrados y no puede eliminarse.");
		clienteRepository.deleteById(id);
	}

	private Cliente buscar(Long id) {
		return clienteRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado: " + id));
	}

	private void mapear(ClienteRequestDTO dto, Cliente c) {
		c.setNombre(dto.getNombre());
		c.setTelefono(dto.getTelefono());
		c.setEmail(dto.getEmail());
	}

	private ClienteResponseDTO toDTO(Cliente c) {
		return new ClienteResponseDTO(c.getIdCliente(), c.getNombre(),
				c.getTelefono(), c.getEmail(), c.getFechaRegistro());
	}
}
