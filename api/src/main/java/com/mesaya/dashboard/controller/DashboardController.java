package com.mesaya.dashboard.controller;

import com.mesaya.dashboard.dto.DashboardResumenDTO;
import com.mesaya.dashboard.service.interfaz.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

	private final IDashboardService dashboardService;

	// GET /api/dashboard/resumen
	@GetMapping("/resumen")
	public ResponseEntity<DashboardResumenDTO> resumen() {
		return ResponseEntity.ok(dashboardService.obtenerResumen());
	}
}
