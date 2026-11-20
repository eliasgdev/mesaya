package com.mesaya.pedido.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AgregarDetalleRequestDTO {
	@NotNull(message = "El producto es obligatorio")
	private Long idProducto;

	@NotNull(message = "La cantidad es obligatoria")
	@Positive(message = "La cantidad debe ser mayor a 0")
	private Integer cantidad;
}
