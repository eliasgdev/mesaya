package com.mesaya.auth.service.interfaz;

import com.mesaya.auth.dto.LoginRequestDTO;
import com.mesaya.auth.dto.RegistroRequestDTO;
import com.mesaya.auth.dto.UsuarioResponseDTO;

public interface IAuthService {
	UsuarioResponseDTO registrar(RegistroRequestDTO dto);
	UsuarioResponseDTO login(LoginRequestDTO dto);
}
