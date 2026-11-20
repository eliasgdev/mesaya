package com.mesaya.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequestDTO {
	@NotBlank(message = "El correo es obligatorio")
	@Email(message = "Correo inválido")
	private String email;

	@NotBlank(message = "La contraseña es obligatoria")
	private String password;
}
