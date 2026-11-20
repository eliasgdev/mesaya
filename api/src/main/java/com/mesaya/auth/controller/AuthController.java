package com.mesaya.auth.controller;

import com.mesaya.auth.dto.*;
import com.mesaya.auth.service.interfaz.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final IAuthService authService;

	// POST /api/auth/registro
	@PostMapping("/registro")
	public ResponseEntity<UsuarioResponseDTO> registro(@Valid @RequestBody RegistroRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrar(dto));
	}

	// POST /api/auth/login
	@PostMapping("/login")
	public ResponseEntity<UsuarioResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
		return ResponseEntity.ok(authService.login(dto));
	}
}
