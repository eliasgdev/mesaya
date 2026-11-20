package com.mesaya.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistroRequestDTO {
	@NotBlank(message = "El nombre es obligatorio")
	@Size(max = 150)
	private String nombre;

	@NotBlank(message = "El correo es obligatorio")
	@Email(message = "Correo inválido")
	private String email;

	@NotBlank(message = "La contraseña es obligatoria")
	@Size(min = 6, message = "Mínimo 6 caracteres")
	private String password;
}
