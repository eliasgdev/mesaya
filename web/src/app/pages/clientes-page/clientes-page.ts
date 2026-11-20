// =====================================
// PAGE — CLIENTES PAGE
// =====================================

import { Component, computed, inject, signal } from '@angular/core';

import { ErrorMessageComponent } from '../../component/atoms/error-message/error-message';
import { LoadingSpinnerComponent } from '../../component/atoms/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../component/molecules/confirm-dialog/confirm-dialog';
import { ModalComponent } from '../../component/molecules/modal/modal';
import { ClientFormComponent } from '../../component/molecules/client-form/client-form';
import { TableSearchComponent } from '../../component/molecules/table-search/table-search';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { ClientsTableComponent } from '../../component/organisms/clients-table/clients-table';
import { Cliente, ClienteRequest } from '../../interfaces/cliente.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout';
import { ClientesService } from '../../services/clientes/clientes';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    TableSearchComponent,
    ClientsTableComponent,
    ModalComponent,
    ClientFormComponent,
    ConfirmDialogComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './clientes-page.html',
  styleUrl: './clientes-page.css',
})
export class ClientesPageComponent {
  private readonly clientesService = inject(ClientesService);

  readonly clientes = signal<Cliente[]>([]);
  readonly cargando = signal(true);
  readonly errorCarga = signal<string | null>(null);
  readonly busqueda = signal('');

  /** undefined: formulario cerrado · null: cliente nuevo · Cliente: edición */
  readonly enEdicion = signal<Cliente | null | undefined>(undefined);
  readonly porEliminar = signal<Cliente | null>(null);
  readonly procesando = signal(false);
  readonly errorAccion = signal<string | null>(null);

  readonly filtrados = computed(() => {
    const t = this.busqueda().trim().toLowerCase();
    return this.clientes().filter(
      (c) => !t || c.nombre.toLowerCase().includes(t) || c.email.toLowerCase().includes(t) || (c.telefono ?? '').includes(t),
    );
  });

  constructor() {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.clientesService.listar().subscribe({
      next: (lista) => {
        this.clientes.set(lista);
        this.errorCarga.set(null);
        this.cargando.set(false);
      },
      error: (e) => {
        this.errorCarga.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }

  abrirFormulario(cliente: Cliente | null): void {
    this.errorAccion.set(null);
    this.enEdicion.set(cliente);
  }

  guardar(datos: ClienteRequest): void {
    const actual = this.enEdicion();
    const peticion = actual
      ? this.clientesService.actualizar(actual.idCliente, datos)
      : this.clientesService.crear(datos);
    this.procesando.set(true);
    peticion.subscribe({
      next: (guardado) => {
        this.clientes.update((lista) =>
          actual ? lista.map((c) => (c.idCliente === guardado.idCliente ? guardado : c)) : [...lista, guardado],
        );
        this.procesando.set(false);
        this.enEdicion.set(undefined);
      },
      error: (e) => {
        this.errorAccion.set(mensajeDeError(e));
        this.procesando.set(false);
      },
    });
  }

  pedirEliminar(cliente: Cliente): void {
    this.errorAccion.set(null);
    this.porEliminar.set(cliente);
  }

  eliminar(): void {
    const cliente = this.porEliminar();
    if (!cliente) return;
    this.procesando.set(true);
    this.clientesService.eliminar(cliente.idCliente).subscribe({
      next: () => {
        this.clientes.update((lista) => lista.filter((c) => c.idCliente !== cliente.idCliente));
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
