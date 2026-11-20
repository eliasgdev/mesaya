package com.mesaya.auth.service.interfaz;

import com.mesaya.auth.dto.LoginRequestDTO;
import com.mesaya.auth.dto.LoginResponseDTO;
import com.mesaya.auth.dto.RegistroRequestDTO;
import com.mesaya.auth.dto.UsuarioResponseDTO;

public interface IAuthService {
	LoginResponseDTO registrar(RegistroRequestDTO dto);
	LoginResponseDTO login(LoginRequestDTO dto);
	UsuarioResponseDTO obtenerPerfil(Long idUsuario);
}
