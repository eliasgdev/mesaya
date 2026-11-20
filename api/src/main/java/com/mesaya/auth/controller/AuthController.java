package com.mesaya.auth.controller;

import com.mesaya.auth.dto.*;
import com.mesaya.auth.service.interfaz.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final IAuthService authService;

	// POST /api/auth/registro
	@PostMapping("/registro")
	public ResponseEntity<LoginResponseDTO> registro(@Valid @RequestBody RegistroRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrar(dto));
	}

	// POST /api/auth/login
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
		return ResponseEntity.ok(authService.login(dto));
	}

	// GET /api/auth/perfil
	@GetMapping("/perfil")
	public ResponseEntity<UsuarioResponseDTO> perfil(@AuthenticationPrincipal Jwt jwt) {
		return ResponseEntity.ok(authService.obtenerPerfil(Long.valueOf(jwt.getSubject())));
	}
}
