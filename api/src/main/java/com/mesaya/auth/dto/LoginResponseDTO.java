package com.mesaya.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
	private String token;
	private long expiraEnSegundos;
	private UsuarioResponseDTO usuario;
}
