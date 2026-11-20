package com.mesaya.pedido.service.interfaz;

import com.mesaya.entity.Pedido.EstadoPedido;
import com.mesaya.pedido.dto.AgregarDetalleRequestDTO;
import com.mesaya.pedido.dto.PedidoRequestDTO;
import com.mesaya.pedido.dto.PedidoResponseDTO;
import java.util.List;

public interface IPedidoService {
	List<PedidoResponseDTO> listar(EstadoPedido estado);
	PedidoResponseDTO obtenerPorId(Long id);
	PedidoResponseDTO crear(PedidoRequestDTO dto);
	void eliminar(Long id);
	PedidoResponseDTO avanzarEstado(Long id);
	PedidoResponseDTO agregarDetalle(Long idPedido, AgregarDetalleRequestDTO dto);
	PedidoResponseDTO eliminarDetalle(Long idPedido, Long idDetalle);
}
