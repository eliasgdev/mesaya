// =====================================
// ORGANISM — PRODUCTS TABLE
// =====================================

import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { TableTagComponent } from '../../atoms/table-tag/table-tag';
import { TableActionsComponent } from '../../molecules/table-actions/table-actions';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CurrencyPipe, TableActionsComponent, TableTagComponent],
  templateUrl: './products-table.html',
  styleUrl: './products-table.css',
})
export class ProductsTableComponent {
  readonly productos = input<Producto[]>([]);
  readonly editar = output<Producto>();
  readonly eliminar = output<Producto>();
}
