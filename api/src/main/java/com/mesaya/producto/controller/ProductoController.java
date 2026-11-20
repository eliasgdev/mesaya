package com.mesaya.producto.controller;

import com.mesaya.producto.dto.ProductoRequestDTO;
import com.mesaya.producto.dto.ProductoResponseDTO;
import com.mesaya.producto.service.interfaz.IProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

	private final IProductoService productoService;

	// GET /api/productos?categoria=Bebida&disponible=true
	@GetMapping
	public ResponseEntity<List<ProductoResponseDTO>> listar(
			@RequestParam(required = false) String categoria,
			@RequestParam(required = false) Boolean disponible) {
		return ResponseEntity.ok(productoService.listar(categoria, disponible));
	}

	// GET /api/productos/{id}
	@GetMapping("/{id}")
	public ResponseEntity<ProductoResponseDTO> obtener(@PathVariable Long id) {
		return ResponseEntity.ok(productoService.obtenerPorId(id));
	}

	// POST /api/productos
	@PostMapping
	public ResponseEntity<ProductoResponseDTO> crear(@Valid @RequestBody ProductoRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(productoService.crear(dto));
	}

	// PUT /api/productos/{id}
	@PutMapping("/{id}")
	public ResponseEntity<ProductoResponseDTO> actualizar(
			@PathVariable Long id,
			@Valid @RequestBody ProductoRequestDTO dto) {
		return ResponseEntity.ok(productoService.actualizar(id, dto));
	}

	// DELETE /api/productos/{id}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable Long id) {
		productoService.eliminar(id);
		return ResponseEntity.noContent().build();
	}
}
