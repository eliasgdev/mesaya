package com.mesaya.pedido.dto;

import com.mesaya.entity.Pedido.EstadoPedido;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoResponseDTO {
	private Long idPedido;
	private Long idMesa;
	private Integer numeroMesa;
	private Long idCliente;
	private String nombreCliente;
	private Long idUsuario;
	private String nombreUsuario;
	private LocalDateTime fechaCreacion;
	private EstadoPedido estado;
	private String observaciones;
	private Double total;
	private List<DetalleResponse> detalles;

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class DetalleResponse {
		private Long idDetalle;
		private Long idProducto;
		private String nombreProducto;
		private Integer cantidad;
		private Double precioUnitario;
		private Double subtotal;
	}
}
