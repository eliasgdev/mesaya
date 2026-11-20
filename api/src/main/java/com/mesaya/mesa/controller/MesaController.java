package com.mesaya.mesa.controller;

import com.mesaya.entity.Mesa.EstadoMesa;
import com.mesaya.mesa.dto.MesaRequestDTO;
import com.mesaya.mesa.dto.MesaResponseDTO;
import com.mesaya.mesa.service.interfaz.IMesaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mesas")
@RequiredArgsConstructor
public class MesaController {

	private final IMesaService mesaService;

	// GET /api/mesas?estado=DISPONIBLE
	@GetMapping
	public ResponseEntity<List<MesaResponseDTO>> listar(
			@RequestParam(required = false) EstadoMesa estado) {
		return ResponseEntity.ok(mesaService.listar(estado));
	}

	// GET /api/mesas/{id}
	@GetMapping("/{id}")
	public ResponseEntity<MesaResponseDTO> obtener(@PathVariable Long id) {
		return ResponseEntity.ok(mesaService.obtenerPorId(id));
	}

	// POST /api/mesas
	@PostMapping
	public ResponseEntity<MesaResponseDTO> crear(@Valid @RequestBody MesaRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(mesaService.crear(dto));
	}

	// PUT /api/mesas/{id}
	@PutMapping("/{id}")
	public ResponseEntity<MesaResponseDTO> actualizar(
			@PathVariable Long id,
			@Valid @RequestBody MesaRequestDTO dto) {
		return ResponseEntity.ok(mesaService.actualizar(id, dto));
	}

	// DELETE /api/mesas/{id}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable Long id) {
		mesaService.eliminar(id);
		return ResponseEntity.noContent().build();
	}
}
