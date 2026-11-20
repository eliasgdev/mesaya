package com.mesaya.mesa.dto;

import com.mesaya.entity.Mesa.EstadoMesa;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MesaResponseDTO {
	private Long idMesa;
	private Integer numero;
	private Integer capacidad;
	private EstadoMesa estado;
}
