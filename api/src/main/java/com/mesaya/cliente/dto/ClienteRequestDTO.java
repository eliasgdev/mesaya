package com.mesaya.cliente.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ClienteRequestDTO {
	@NotBlank(message = "El nombre es obligatorio")
	@Size(max = 150)
	private String nombre;

	@Size(max = 20)
	private String telefono;

	@NotBlank(message = "El correo es obligatorio")
	@Email(message = "Correo inválido")
	private String email;
}
