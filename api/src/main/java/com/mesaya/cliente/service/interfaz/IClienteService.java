package com.mesaya.cliente.service.interfaz;

import com.mesaya.cliente.dto.ClienteRequestDTO;
import com.mesaya.cliente.dto.ClienteResponseDTO;
import java.util.List;

public interface IClienteService {
	List<ClienteResponseDTO> listar(String busqueda);
	ClienteResponseDTO obtenerPorId(Long id);
	ClienteResponseDTO crear(ClienteRequestDTO dto);
	ClienteResponseDTO actualizar(Long id, ClienteRequestDTO dto);
	void eliminar(Long id);
}
