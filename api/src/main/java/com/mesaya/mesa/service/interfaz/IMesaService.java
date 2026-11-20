package com.mesaya.mesa.service.interfaz;

import com.mesaya.entity.Mesa.EstadoMesa;
import com.mesaya.mesa.dto.MesaRequestDTO;
import com.mesaya.mesa.dto.MesaResponseDTO;
import java.util.List;

public interface IMesaService {
	List<MesaResponseDTO> listar(EstadoMesa estado);
	MesaResponseDTO obtenerPorId(Long id);
	MesaResponseDTO crear(MesaRequestDTO dto);
	MesaResponseDTO actualizar(Long id, MesaRequestDTO dto);
	void eliminar(Long id);
}
