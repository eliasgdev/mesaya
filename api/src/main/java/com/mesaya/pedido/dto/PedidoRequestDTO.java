package com.mesaya.pedido.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Data
public class PedidoRequestDTO {
	@NotNull(message = "La mesa es obligatoria")
	private Long idMesa;

	private Long idCliente;   // opcional


	private String observaciones;

	@NotNull @Size(min = 1, message = "Debe incluir al menos un producto")
	private List<ItemRequest> items;

	@Data
	public static class ItemRequest {
		@NotNull
		private Long idProducto;
		@NotNull
		@Positive
		private Integer cantidad;
	}
}
