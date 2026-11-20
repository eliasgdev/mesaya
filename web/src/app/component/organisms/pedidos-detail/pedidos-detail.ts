// =====================================
// ORGANISM — PEDIDOS DETAIL
// =====================================

import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { BadgeStatusComponent } from '../../atoms/badge-status/badge-status';
import { OrderItemComponent } from '../../molecules/order-item/order-item';
import { Pedido } from '../../../interfaces/pedido.interface';

@Component({
  selector: 'app-pedidos-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, BadgeStatusComponent, OrderItemComponent],
  templateUrl: './pedidos-detail.html',
  styleUrl: './pedidos-detail.css',
})
export class PedidosDetailComponent {
  readonly pedido = input.required<Pedido>();
  readonly quitar = output<number>();
  // Solo se quitan ítems mientras el pedido no ha pasado a cocina, y debe quedar al menos uno.
  readonly puedeQuitar = computed(() => this.pedido().estado === 'CREADA' && this.pedido().detalles.length > 1);
}
