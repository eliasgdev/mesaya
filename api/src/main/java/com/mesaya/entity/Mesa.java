package com.mesaya.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mesa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mesa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_mesa")
	private Long idMesa;

	@Column(name = "numero", nullable = false, unique = true)
	private Integer numero;

	@Column(name = "capacidad", nullable = false)
	private Integer capacidad;

	@Enumerated(EnumType.STRING)
	@Column(name = "estado", nullable = false, length = 20)
	private EstadoMesa estado = EstadoMesa.DISPONIBLE;

	public enum EstadoMesa {
		DISPONIBLE, OCUPADA, RESERVADA
	}
}
