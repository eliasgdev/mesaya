package com.mesaya.dashboard.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResumenDTO {
	private long productosActivos;
	private long mesasDisponibles;
	private long pedidosActivos;        // CREADA + EN_PREPARACION
	private long pedidosEntregadosHoy;
}
