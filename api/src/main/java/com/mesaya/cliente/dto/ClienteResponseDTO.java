package com.mesaya.cliente.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteResponseDTO {
	private Long idCliente;
	private String nombre;
	private String telefono;
	private String email;
	private LocalDateTime fechaRegistro;
}
