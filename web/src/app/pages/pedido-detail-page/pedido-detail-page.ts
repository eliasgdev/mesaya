// =====================================
// PAGE — PEDIDO DETAIL PAGE
// =====================================

import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonComponent } from '../../component/atoms/button/button';
import { ErrorMessageComponent } from '../../component/atoms/error-message/error-message';
import { LoadingSpinnerComponent } from '../../component/atoms/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../component/molecules/confirm-dialog/confirm-dialog';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PedidosDetailComponent } from '../../component/organisms/pedidos-detail/pedidos-detail';
import { Pedido, SIGUIENTE_ACCION_PEDIDO } from '../../interfaces/pedido.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout';
import { PedidosService } from '../../services/pedidos/pedidos';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-pedido-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    DashboardLayoutComponent,
    NavbarComponent,
    PedidosDetailComponent,
    ButtonComponent,
    ConfirmDialogComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './pedido-detail-page.html',
  styleUrl: './pedido-detail-page.css',
})
export class PedidoDetailPageComponent implements OnInit {
  private readonly pedidosService = inject(PedidosService);
  private readonly router = inject(Router);

  /** Viene de la ruta /pedido/:id */
  readonly id = input.required<string>();

  readonly pedido = signal<Pedido | null>(null);
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);
  readonly procesando = signal(false);
  readonly confirmandoEliminar = signal(false);

  readonly siguienteAccion = computed(() => {
    const p = this.pedido();
    return p ? (SIGUIENTE_ACCION_PEDIDO[p.estado] ?? null) : null;
  });

  ngOnInit(): void {
    this.pedidosService.obtener(Number(this.id())).subscribe({
      next: (p) => {
        this.pedido.set(p);
        this.cargando.set(false);
      },
      error: (e) => {
        this.error.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }

  avanzar(): void {
    const p = this.pedido();
    if (!p) return;
    this.ejecutar(this.pedidosService.avanzarEstado(p.idPedido));
  }

  quitarItem(idDetalle: number): void {
    const p = this.pedido();
    if (!p) return;
    this.ejecutar(this.pedidosService.quitarItem(p.idPedido, idDetalle));
  }

  eliminar(): void {
    const p = this.pedido();
    if (!p) return;
    this.procesando.set(true);
    this.pedidosService.eliminar(p.idPedido).subscribe({
      next: () => this.router.navigate(['/pedidos']),
      error: (e) => {
        this.error.set(mensajeDeError(e));
        this.procesando.set(false);
        this.confirmandoEliminar.set(false);
      },
    });
  }

  private ejecutar(peticion: ReturnType<PedidosService['obtener']>): void {
    this.procesando.set(true);
    this.error.set(null);
    peticion.subscribe({
      next: (p) => {
        this.pedido.set(p);
        this.procesando.set(false);
      },
      error: (e) => {
        this.error.set(mensajeDeError(e));
        this.procesando.set(false);
      },
    });
  }
}
