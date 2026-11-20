package com.mesaya.mesa.dto;

import com.mesaya.entity.Mesa.EstadoMesa;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class MesaRequestDTO {
	@NotNull(message = "El número de mesa es obligatorio")
	@Positive
	private Integer numero;

	@NotNull(message = "La capacidad es obligatoria")
	@Positive
	private Integer capacidad;

	private EstadoMesa estado = EstadoMesa.DISPONIBLE;
}
