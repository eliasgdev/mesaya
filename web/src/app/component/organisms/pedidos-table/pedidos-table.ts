// =====================================
// ORGANISM — PEDIDOS TABLE
// =====================================

import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BadgeStatusComponent } from '../../atoms/badge-status/badge-status';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button';
import { Pedido, SIGUIENTE_ACCION_PEDIDO } from '../../../interfaces/pedido.interface';

@Component({
  selector: 'app-pedidos-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, BadgeStatusComponent, IconButtonComponent],
  templateUrl: './pedidos-table.html',
  styleUrl: './pedidos-table.css',
})
export class PedidosTableComponent {
  readonly pedidos = input<Pedido[]>([]);
  readonly avanzar = output<Pedido>();
  readonly eliminar = output<Pedido>();
  readonly siguienteAccion = SIGUIENTE_ACCION_PEDIDO;
}
