package com.mesaya.auth.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponseDTO {
	private Long id;
	private String nombre;
	private String email;
}
