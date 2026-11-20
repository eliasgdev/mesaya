// =====================================
// ORGANISM — PEDIDO FORM
// =====================================

import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, input, output, signal, untracked } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { OpcionSelect, SelectFieldComponent } from '../../atoms/select-field/select-field';
import { TableSearchComponent } from '../../molecules/table-search/table-search';
import { Cliente } from '../../../interfaces/cliente.interface';
import { Mesa } from '../../../interfaces/mesa.interface';
import { PedidoRequest } from '../../../interfaces/pedido.interface';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [
    CurrencyPipe,
    ButtonComponent,
    ErrorMessageComponent,
    IconButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    TableSearchComponent,
  ],
  templateUrl: './pedido-form.html',
  styleUrl: './pedido-form.css',
})
export class PedidoFormComponent {
  readonly mesas = input<Mesa[]>([]);
  readonly clientes = input<Cliente[]>([]);
  readonly productos = input<Producto[]>([]);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly guardar = output<PedidoRequest>();
  readonly cancelar = output<void>();

  readonly idMesa = signal('');
  readonly idCliente = signal('');
  readonly observaciones = signal('');
  readonly busqueda = signal('');
  readonly cantidades = signal<Partial<Record<number, number>>>({});
  readonly errorLocal = signal<string | null>(null);

  // Solo se pueden tomar pedidos en mesas que no estén ocupadas
  readonly opcionesMesa = computed<OpcionSelect[]>(() =>
    this.mesas()
      .filter((m) => m.estado !== 'OCUPADA')
      .map((m) => ({
        valor: String(m.idMesa),
        etiqueta: `Mesa ${m.numero} · ${m.capacidad} personas${m.estado === 'RESERVADA' ? ' (reservada)' : ''}`,
      })),
  );

  readonly opcionesCliente = computed<OpcionSelect[]>(() =>
    this.clientes().map((c) => ({ valor: String(c.idCliente), etiqueta: c.nombre })),
  );

  readonly productosVisibles = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    return this.productos()
      .filter((p) => p.disponible)
      .filter((p) => !termino || p.nombre.toLowerCase().includes(termino) || p.categoria.toLowerCase().includes(termino));
  });

  readonly total = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio * (this.cantidades()[p.idProducto] ?? 0), 0),
  );

  readonly cantidadItems = computed(() => Object.values(this.cantidades()).reduce((a: number, b) => a + (b ?? 0), 0));

  constructor() {
    // Si la persona corrige la mesa o los productos, el aviso anterior deja de aplicar
    effect(() => {
      this.idMesa();
      this.cantidades();
      untracked(() => this.errorLocal.set(null));
    });
  }

  cambiarCantidad(idProducto: number, delta: number): void {
    this.cantidades.update((actual) => {
      const nueva = Math.max(0, (actual[idProducto] ?? 0) + delta);
      const copia = { ...actual, [idProducto]: nueva };
      if (nueva === 0) delete copia[idProducto];
      return copia;
    });
  }

  onSubmit(): void {
    if (!this.idMesa()) {
      this.errorLocal.set('Elige la mesa del pedido.');
      return;
    }
    const items = Object.entries(this.cantidades()).map(([id, cantidad]) => ({ idProducto: Number(id), cantidad: cantidad ?? 0 }));
    if (!items.length) {
      this.errorLocal.set('Agrega al menos un producto.');
      return;
    }
    this.errorLocal.set(null);
    this.guardar.emit({
      idMesa: Number(this.idMesa()),
      idCliente: this.idCliente() ? Number(this.idCliente()) : null,
      observaciones: this.observaciones().trim() || null,
      items,
    });
  }
}
