package com.mesaya.auth.service.impl;

import com.mesaya.auth.dto.*;
import com.mesaya.auth.service.interfaz.IAuthService;
import com.mesaya.entity.Usuario;
import com.mesaya.exception.*;
import com.mesaya.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.UUID;

@Service
public class AuthServiceImpl implements IAuthService {

	private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder passwordEncoder;
	private final TokenService tokenService;
	// Hash de una clave aleatoria para comparar cuando el correo no existe:
	// así el tiempo de respuesta no revela qué correos están registrados.
	private final String hashFalso;

	public AuthServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
						   TokenService tokenService) {
		this.usuarioRepository = usuarioRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenService = tokenService;
		this.hashFalso = passwordEncoder.encode(UUID.randomUUID().toString());
	}

	@Override
	@Transactional
	public LoginResponseDTO registrar(RegistroRequestDTO dto) {
		String email = normalizar(dto.getEmail());
		if (usuarioRepository.existsByEmail(email))
			throw new BusinessException("El correo ya está registrado.");
		Usuario u = new Usuario();
		u.setNombre(dto.getNombre().trim());
		u.setEmail(email);
		u.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
		u.setActivo(true);
		return respuesta(usuarioRepository.save(u));
	}

	@Override
	@Transactional(readOnly = true)
	public LoginResponseDTO login(LoginRequestDTO dto) {
		Usuario u = usuarioRepository.findByEmail(normalizar(dto.getEmail())).orElse(null);
		boolean claveOk = passwordEncoder.matches(dto.getPassword(),
				u != null ? u.getPasswordHash() : hashFalso);
		if (u == null || !claveOk || !Boolean.TRUE.equals(u.getActivo()))
			throw new CredencialesInvalidasException();
		return respuesta(u);
	}

	@Override
	@Transactional(readOnly = true)
	public UsuarioResponseDTO obtenerPerfil(Long idUsuario) {
		Usuario u = usuarioRepository.findById(idUsuario)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado."));
		return aDTO(u);
	}

	private LoginResponseDTO respuesta(Usuario u) {
		return new LoginResponseDTO(tokenService.generar(u), tokenService.segundosDeVigencia(), aDTO(u));
	}

	private UsuarioResponseDTO aDTO(Usuario u) {
		return new UsuarioResponseDTO(u.getIdUsuario(), u.getNombre(), u.getEmail());
	}

	private String normalizar(String email) {
		return email.trim().toLowerCase(Locale.ROOT);
	}
}
