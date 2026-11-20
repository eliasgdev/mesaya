package com.mesaya.pedido.controller;

import com.mesaya.entity.Pedido.EstadoPedido;
import com.mesaya.pedido.dto.AgregarDetalleRequestDTO;
import com.mesaya.pedido.dto.PedidoRequestDTO;
import com.mesaya.pedido.dto.PedidoResponseDTO;
import com.mesaya.pedido.service.interfaz.IPedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {

	private final IPedidoService pedidoService;

	// GET /api/pedidos?estado=CREADA
	@GetMapping
	public ResponseEntity<List<PedidoResponseDTO>> listar(
			@RequestParam(required = false) EstadoPedido estado) {
		return ResponseEntity.ok(pedidoService.listar(estado));
	}

	// GET /api/pedidos/{id}
	@GetMapping("/{id}")
	public ResponseEntity<PedidoResponseDTO> obtener(@PathVariable Long id) {
		return ResponseEntity.ok(pedidoService.obtenerPorId(id));
	}

	// POST /api/pedidos
	@PostMapping
	public ResponseEntity<PedidoResponseDTO> crear(@Valid @RequestBody PedidoRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.crear(dto));
	}

	// DELETE /api/pedidos/{id}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable Long id) {
		pedidoService.eliminar(id);
		return ResponseEntity.noContent().build();
	}

	// PATCH /api/pedidos/{id}/estado
	@PatchMapping("/{id}/estado")
	public ResponseEntity<PedidoResponseDTO> avanzarEstado(@PathVariable Long id) {
		return ResponseEntity.ok(pedidoService.avanzarEstado(id));
	}

	// POST /api/pedidos/{id}/detalles
	@PostMapping("/{id}/detalles")
	public ResponseEntity<PedidoResponseDTO> agregarDetalle(
			@PathVariable Long id,
			@Valid @RequestBody AgregarDetalleRequestDTO dto) {
		return ResponseEntity.ok(pedidoService.agregarDetalle(id, dto));
	}

	// DELETE /api/pedidos/{id}/detalles/{detalleId}
	@DeleteMapping("/{id}/detalles/{detalleId}")
	public ResponseEntity<PedidoResponseDTO> eliminarDetalle(
			@PathVariable Long id,
			@PathVariable Long detalleId) {
		return ResponseEntity.ok(pedidoService.eliminarDetalle(id, detalleId));
	}
}
