// =====================================
// MOLECULE — ORDER ITEM
// =====================================

import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { IconButtonComponent } from '../../atoms/icon-button/icon-button';
import { DetallePedido } from '../../../interfaces/pedido.interface';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CurrencyPipe, IconButtonComponent],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItemComponent {
  readonly detalle = input.required<DetallePedido>();
  readonly puedeQuitar = input(false);
  readonly quitar = output<void>();
}
