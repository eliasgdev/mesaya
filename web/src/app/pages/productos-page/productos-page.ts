// =====================================
// PAGE — PRODUCTOS PAGE
// =====================================

import { Component, computed, inject, signal } from '@angular/core';

import { ErrorMessageComponent } from '../../component/atoms/error-message/error-message';
import { LoadingSpinnerComponent } from '../../component/atoms/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../component/molecules/confirm-dialog/confirm-dialog';
import { ModalComponent } from '../../component/molecules/modal/modal';
import { ProductFormComponent } from '../../component/molecules/product-form/product-form';
import { TableSearchComponent } from '../../component/molecules/table-search/table-search';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { ProductsTableComponent } from '../../component/organisms/products-table/products-table';
import { Producto, ProductoRequest } from '../../interfaces/producto.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout';
import { ProductosService } from '../../services/productos/productos';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    TableSearchComponent,
    ProductsTableComponent,
    ModalComponent,
    ProductFormComponent,
    ConfirmDialogComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPageComponent {
  private readonly productosService = inject(ProductosService);

  readonly productos = signal<Producto[]>([]);
  readonly cargando = signal(true);
  readonly errorCarga = signal<string | null>(null);
  readonly busqueda = signal('');

  /** undefined: formulario cerrado · null: producto nuevo · Producto: edición */
  readonly enEdicion = signal<Producto | null | undefined>(undefined);
  readonly porEliminar = signal<Producto | null>(null);
  readonly procesando = signal(false);
  readonly errorAccion = signal<string | null>(null);

  readonly filtrados = computed(() => {
    const t = this.busqueda().trim().toLowerCase();
    return this.productos().filter(
      (p) => !t || p.nombre.toLowerCase().includes(t) || p.categoria.toLowerCase().includes(t),
    );
  });

  readonly categorias = computed(() => [...new Set(this.productos().map((p) => p.categoria))].sort());

  constructor() {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.productosService.listar().subscribe({
      next: (lista) => {
        this.productos.set(lista);
        this.errorCarga.set(null);
        this.cargando.set(false);
      },
      error: (e) => {
        this.errorCarga.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }

  abrirFormulario(producto: Producto | null): void {
    this.errorAccion.set(null);
    this.enEdicion.set(producto);
  }

  guardar(datos: ProductoRequest): void {
    const actual = this.enEdicion();
    const peticion = actual
      ? this.productosService.actualizar(actual.idProducto, datos)
      : this.productosService.crear(datos);
    this.procesando.set(true);
    peticion.subscribe({
      next: (guardado) => {
        this.productos.update((lista) =>
          actual ? lista.map((p) => (p.idProducto === guardado.idProducto ? guardado : p)) : [...lista, guardado],
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

  pedirEliminar(producto: Producto): void {
    this.errorAccion.set(null);
    this.porEliminar.set(producto);
  }

  eliminar(): void {
    const producto = this.porEliminar();
    if (!producto) return;
    this.procesando.set(true);
    this.productosService.eliminar(producto.idProducto).subscribe({
      next: () => {
        this.productos.update((lista) => lista.filter((p) => p.idProducto !== producto.idProducto));
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
