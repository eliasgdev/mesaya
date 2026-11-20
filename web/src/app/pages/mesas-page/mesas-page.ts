// =====================================
// PAGE — MESAS PAGE
// =====================================

import { Component, computed, inject, signal } from '@angular/core';

import { ErrorMessageComponent } from '../../component/atoms/error-message/error-message';
import { LoadingSpinnerComponent } from '../../component/atoms/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../component/molecules/confirm-dialog/confirm-dialog';
import { MesaFormComponent } from '../../component/molecules/mesa-form/mesa-form';
import { ModalComponent } from '../../component/molecules/modal/modal';
import { MesasGridComponent } from '../../component/organisms/mesas-grid/mesas-grid';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { Mesa, MesaRequest } from '../../interfaces/mesa.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout';
import { MesasService } from '../../services/mesas/mesas';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-mesas-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    MesasGridComponent,
    ModalComponent,
    MesaFormComponent,
    ConfirmDialogComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './mesas-page.html',
  styleUrl: './mesas-page.css',
})
export class MesasPageComponent {
  private readonly mesasService = inject(MesasService);

  readonly mesas = signal<Mesa[]>([]);
  readonly cargando = signal(true);
  readonly errorCarga = signal<string | null>(null);
  readonly enEdicion = signal<Mesa | null | undefined>(undefined);
  readonly porEliminar = signal<Mesa | null>(null);
  readonly procesando = signal(false);
  readonly errorAccion = signal<string | null>(null);

  readonly resumen = computed(() => {
    const m = this.mesas();
    const libres = m.filter((x) => x.estado === 'DISPONIBLE').length;
    const ocupadas = m.filter((x) => x.estado === 'OCUPADA').length;
    return `${libres} disponibles · ${ocupadas} ocupadas · ${m.length - libres - ocupadas} reservadas`;
  });

  constructor() {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.mesasService.listar().subscribe({
      next: (lista) => {
        this.mesas.set(lista);
        this.errorCarga.set(null);
        this.cargando.set(false);
      },
      error: (e) => {
        this.errorCarga.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }

  abrirFormulario(mesa: Mesa | null): void {
    this.errorAccion.set(null);
    this.enEdicion.set(mesa);
  }

  guardar(datos: MesaRequest): void {
    const actual = this.enEdicion();
    const peticion = actual ? this.mesasService.actualizar(actual.idMesa, datos) : this.mesasService.crear(datos);
    this.procesando.set(true);
    peticion.subscribe({
      next: (guardada) => {
        this.mesas.update((lista) =>
          (actual ? lista.map((m) => (m.idMesa === guardada.idMesa ? guardada : m)) : [...lista, guardada]).sort(
            (a, b) => a.numero - b.numero,
          ),
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

  pedirEliminar(mesa: Mesa): void {
    this.errorAccion.set(null);
    this.porEliminar.set(mesa);
  }

  eliminar(): void {
    const mesa = this.porEliminar();
    if (!mesa) return;
    this.procesando.set(true);
    this.mesasService.eliminar(mesa.idMesa).subscribe({
      next: () => {
        this.mesas.update((lista) => lista.filter((m) => m.idMesa !== mesa.idMesa));
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
