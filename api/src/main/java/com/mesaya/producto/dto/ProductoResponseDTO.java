package com.mesaya.producto.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoResponseDTO {
	private Long idProducto;
	private String nombre;
	private String descripcion;
	private Double precio;
	private String categoria;
	private String imagenUrl;
	private Boolean disponible;
	private Integer stock;
}
