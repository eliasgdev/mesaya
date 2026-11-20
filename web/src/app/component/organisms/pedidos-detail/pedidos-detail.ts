import { Component } from '@angular/core';

import { OrderItemComponent } from '../../molecules/order-item/order-item';

@Component({
  selector: 'app-pedidos-detail',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './pedidos-detail.html',
  styleUrl: './pedidos-detail.css'
})
export class PedidosDetailComponent {}