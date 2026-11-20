package com.mesaya.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "producto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_producto")
	private Long idProducto;

	@Column(name = "nombre", nullable = false, length = 150)
	private String nombre;

	@Column(name = "descripcion", columnDefinition = "TEXT")
	private String descripcion;

	@Column(name = "precio", nullable = false)
	private Double precio;

	@Column(name = "categoria", nullable = false, length = 80)
	private String categoria;

	@Column(name = "imagen_url", length = 255)
	private String imagenUrl;

	@Column(name = "disponible", nullable = false)
	private Boolean disponible = true;

	@Column(name = "stock", nullable = false)
	private Integer stock = 0;
}
