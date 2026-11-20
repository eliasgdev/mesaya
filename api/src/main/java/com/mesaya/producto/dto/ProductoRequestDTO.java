package com.mesaya.producto.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductoRequestDTO {
	@NotBlank(message = "El nombre es obligatorio")
	@Size(max = 150)
	private String nombre;

	private String descripcion;

	@NotNull(message = "El precio es obligatorio")
	@Positive(message = "El precio debe ser mayor a 0")
	private Double precio;

	@NotBlank(message = "La categoría es obligatoria")
	@Size(max = 80)
	private String categoria;

	private String imagenUrl;

	@NotNull(message = "El campo disponible es obligatorio")
	private Boolean disponible;

	@NotNull(message = "El stock es obligatorio")
	@PositiveOrZero
	private Integer stock;
}
