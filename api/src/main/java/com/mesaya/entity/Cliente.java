package com.mesaya.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_cliente")
	private Long idCliente;

	@Column(name = "nombre", nullable = false, length = 150)
	private String nombre;

	@Column(name = "telefono", length = 20)
	private String telefono;

	@Column(name = "email", nullable = false, unique = true, length = 150)
	private String email;

	@CreationTimestamp
	@Column(name = "fecha_registro", nullable = false, updatable = false)
	private LocalDateTime fechaRegistro;
}
