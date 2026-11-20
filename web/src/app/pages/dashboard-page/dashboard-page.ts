// =====================================
// PAGE — DASHBOARD PAGE
// =====================================

import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ErrorMessageComponent } from '../../component/atoms/error-message/error-message';
import { DashboardCardsComponent } from '../../component/organisms/dashboard-cards/dashboard-cards';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PedidosTableComponent } from '../../component/organisms/pedidos-table/pedidos-table';
import { DashboardResumen, Pedido } from '../../interfaces/pedido.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout';
import { AuthService } from '../../services/auth/auth';
import { DashboardService } from '../../services/dashboard/dashboard';
import { PedidosService } from '../../services/pedidos/pedidos';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, DashboardLayoutComponent, NavbarComponent, DashboardCardsComponent, PedidosTableComponent, ErrorMessageComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPageComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly pedidosService = inject(PedidosService);
  protected readonly auth = inject(AuthService);

  readonly resumen = signal<DashboardResumen | null>(null);
  readonly pedidos = signal<Pedido[]>([]);
  readonly error = signal<string | null>(null);

  readonly activos = computed(() => this.pedidos().filter((p) => p.estado !== 'ENTREGADA'));
  readonly saludo = computed(() => {
    const hora = new Date().getHours();
    const nombre = this.auth.usuario()?.nombre.split(' ')[0] ?? '';
    return `${hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches'}, ${nombre}`;
  });

  constructor() {
    this.cargar();
  }

  cargar(): void {
    forkJoin({ resumen: this.dashboardService.resumen(), pedidos: this.pedidosService.listar() }).subscribe({
      next: ({ resumen, pedidos }) => {
        this.resumen.set(resumen);
        this.pedidos.set(pedidos);
      },
      error: (e) => this.error.set(mensajeDeError(e)),
    });
  }

  avanzar(pedido: Pedido): void {
    this.pedidosService.avanzarEstado(pedido.idPedido).subscribe({
      next: () => this.cargar(),
      error: (e) => this.error.set(mensajeDeError(e)),
    });
  }
}
