package com.mesaya.dashboard.service.impl;

import com.mesaya.dashboard.dto.DashboardResumenDTO;
import com.mesaya.dashboard.service.interfaz.IDashboardService;
import com.mesaya.entity.Mesa.EstadoMesa;
import com.mesaya.entity.Pedido.EstadoPedido;
import com.mesaya.repository.MesaRepository;
import com.mesaya.repository.PedidoRepository;
import com.mesaya.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements IDashboardService {

	private final ProductoRepository productoRepository;
	private final MesaRepository     mesaRepository;
	private final PedidoRepository   pedidoRepository;

	@Override
	@Transactional(readOnly = true)
	public DashboardResumenDTO obtenerResumen() {
		long productosActivos    = productoRepository.countByDisponible(true);
		long mesasDisponibles    = mesaRepository.countByEstado(EstadoMesa.DISPONIBLE);
		long pedidosActivos      = pedidoRepository.countByEstadoIn(
				List.of(EstadoPedido.CREADA, EstadoPedido.EN_PREPARACION));

		LocalDateTime inicio = LocalDate.now().atStartOfDay();
		LocalDateTime fin    = inicio.plusDays(1);
		long entregadosHoy   = pedidoRepository.countEntregadosEntre(inicio, fin);

		return new DashboardResumenDTO(productosActivos, mesasDisponibles,
				pedidosActivos, entregadosHoy);
	}
}
