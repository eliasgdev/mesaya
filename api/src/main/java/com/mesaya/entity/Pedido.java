package com.mesaya.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pedido")
	private Long idPedido;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_mesa", nullable = false)
	private Mesa mesa;

	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "id_cliente", nullable = true)
	private Cliente cliente;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario usuario;

	@CreationTimestamp
	@Column(name = "fecha_creacion", nullable = false, updatable = false)
	private LocalDateTime fechaCreacion;

	@Enumerated(EnumType.STRING)
	@Column(name = "estado", nullable = false, length = 20)
	private EstadoPedido estado = EstadoPedido.CREADA;

	@Column(name = "observaciones", columnDefinition = "TEXT")
	private String observaciones;

	@OneToMany(
		mappedBy = "pedido",
		cascade = CascadeType.ALL,
		orphanRemoval = true,
		fetch = FetchType.LAZY
	)
	private List<DetallePedido> detalles = new ArrayList<>();

	public enum EstadoPedido {
		CREADA, EN_PREPARACION, ENTREGADA;

		public EstadoPedido siguiente() {
			return switch (this) {
				case CREADA          -> EN_PREPARACION;
				case EN_PREPARACION  -> ENTREGADA;
				case ENTREGADA       -> throw new IllegalStateException("El pedido ya fue entregado.");
			};
		}
	}
}
