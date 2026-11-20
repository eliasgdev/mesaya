package com.mesaya.cliente.controller;

import com.mesaya.cliente.dto.ClienteRequestDTO;
import com.mesaya.cliente.dto.ClienteResponseDTO;
import com.mesaya.cliente.service.interfaz.IClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

	private final IClienteService clienteService;

	// GET /api/clientes?busqueda=juan
	@GetMapping
	public ResponseEntity<List<ClienteResponseDTO>> listar(
			@RequestParam(required = false) String busqueda) {
		return ResponseEntity.ok(clienteService.listar(busqueda));
	}

	// GET /api/clientes/{id}
	@GetMapping("/{id}")
	public ResponseEntity<ClienteResponseDTO> obtener(@PathVariable Long id) {
		return ResponseEntity.ok(clienteService.obtenerPorId(id));
	}

	// POST /api/clientes
	@PostMapping
	public ResponseEntity<ClienteResponseDTO> crear(@Valid @RequestBody ClienteRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.crear(dto));
	}

	// PUT /api/clientes/{id}
	@PutMapping("/{id}")
	public ResponseEntity<ClienteResponseDTO> actualizar(
			@PathVariable Long id,
			@Valid @RequestBody ClienteRequestDTO dto) {
		return ResponseEntity.ok(clienteService.actualizar(id, dto));
	}

	// DELETE /api/clientes/{id}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable Long id) {
		clienteService.eliminar(id);
		return ResponseEntity.noContent().build();
	}
}
