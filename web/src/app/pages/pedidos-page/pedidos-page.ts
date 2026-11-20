// =====================================
// PAGE — PEDIDOS PAGE
// =====================================

import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ErrorMessageComponent } from '../../component/atoms/error-message/error-message';
import { LoadingSpinnerComponent } from '../../component/atoms/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../component/molecules/confirm-dialog/confirm-dialog';
import { ModalComponent } from '../../component/molecules/modal/modal';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { PedidoFormComponent } from '../../component/organisms/pedido-form/pedido-form';
import { PedidosTableComponent } from '../../component/organisms/pedidos-table/pedidos-table';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mesa } from '../../interfaces/mesa.interface';
import { EstadoPedido, Pedido, PedidoRequest } from '../../interfaces/pedido.interface';
import { Producto } from '../../interfaces/producto.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout';
import { ClientesService } from '../../services/clientes/clientes';
import { MesasService } from '../../services/mesas/mesas';
import { PedidosService } from '../../services/pedidos/pedidos';
import { ProductosService } from '../../services/productos/productos';
import { mensajeDeError } from '../../utils/mensaje-error';

type Filtro = 'ACTIVOS' | EstadoPedido | 'TODOS';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    PedidosTableComponent,
    PedidoFormComponent,
    ModalComponent,
    ConfirmDialogComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './pedidos-page.html',
  styleUrl: './pedidos-page.css',
})
export class PedidosPageComponent {
  private readonly pedidosService = inject(PedidosService);
  private readonly mesasService = inject(MesasService);
  private readonly clientesService = inject(ClientesService);
  private readonly productosService = inject(ProductosService);
  private readonly router = inject(Router);

  readonly pedidos = signal<Pedido[]>([]);
  readonly cargando = signal(true);
  readonly errorCarga = signal<string | null>(null);
  readonly filtro = signal<Filtro>('ACTIVOS');

  readonly creando = signal(false);
  readonly mesas = signal<Mesa[]>([]);
  readonly clientes = signal<Cliente[]>([]);
  readonly productos = signal<Producto[]>([]);
  readonly porEliminar = signal<Pedido | null>(null);
  readonly procesando = signal(false);
  readonly errorAccion = signal<string | null>(null);

  readonly filtros: { valor: Filtro; texto: string }[] = [
    { valor: 'ACTIVOS', texto: 'Activos' },
    { valor: 'CREADA', texto: 'Creados' },
    { valor: 'EN_PREPARACION', texto: 'En preparación' },
    { valor: 'ENTREGADA', texto: 'Entregados' },
    { valor: 'TODOS', texto: 'Todos' },
  ];

  readonly visibles = computed(() => {
    const f = this.filtro();
    return this.pedidos().filter((p) =>
      f === 'TODOS' ? true : f === 'ACTIVOS' ? p.estado !== 'ENTREGADA' : p.estado === f,
    );
  });

  readonly conteo = computed(() => {
    const c: Record<Filtro, number> = { ACTIVOS: 0, CREADA: 0, EN_PREPARACION: 0, ENTREGADA: 0, TODOS: 0 };
    for (const p of this.pedidos()) {
      c[p.estado]++;
      c.TODOS++;
      if (p.estado !== 'ENTREGADA') c.ACTIVOS++;
    }
    return c;
  });

  constructor() {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.pedidosService.listar().subscribe({
      next: (lista) => {
        this.pedidos.set(lista);
        this.errorCarga.set(null);
        this.cargando.set(false);
      },
      error: (e) => {
        this.errorCarga.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }

  abrirCreacion(): void {
    this.errorAccion.set(null);
    this.procesando.set(true);
    // Se cargan mesas, clientes y carta actualizados antes de abrir el formulario
    forkJoin({
      mesas: this.mesasService.listar(),
      clientes: this.clientesService.listar(),
      productos: this.productosService.listar(),
    }).subscribe({
      next: ({ mesas, clientes, productos }) => {
        this.mesas.set(mesas);
        this.clientes.set(clientes);
        this.productos.set(productos);
        this.procesando.set(false);
        this.creando.set(true);
      },
      error: (e) => {
        this.errorCarga.set(mensajeDeError(e));
        this.procesando.set(false);
      },
    });
  }

  crear(datos: PedidoRequest): void {
    this.procesando.set(true);
    this.pedidosService.crear(datos).subscribe({
      next: (pedido) => {
        this.procesando.set(false);
        this.creando.set(false);
        this.router.navigate(['/pedido', pedido.idPedido]);
      },
      error: (e) => {
        this.errorAccion.set(mensajeDeError(e));
        this.procesando.set(false);
      },
    });
  }

  avanzar(pedido: Pedido): void {
    this.pedidosService.avanzarEstado(pedido.idPedido).subscribe({
      next: (actualizado) =>
        this.pedidos.update((lista) => lista.map((p) => (p.idPedido === actualizado.idPedido ? actualizado : p))),
      error: (e) => this.errorCarga.set(mensajeDeError(e)),
    });
  }

  pedirEliminar(pedido: Pedido): void {
    this.errorAccion.set(null);
    this.porEliminar.set(pedido);
  }

  eliminar(): void {
    const pedido = this.porEliminar();
    if (!pedido) return;
    this.procesando.set(true);
    this.pedidosService.eliminar(pedido.idPedido).subscribe({
      next: () => {
        this.pedidos.update((lista) => lista.filter((p) => p.idPedido !== pedido.idPedido));
        this.procesando.set(false);
        this.porEliminar.set(null);
      },
      error: (e) => {
        this.errorAccion.set(mensajeDeError(e));
        this.procesando.set(false);
      },
    });
  }
}
