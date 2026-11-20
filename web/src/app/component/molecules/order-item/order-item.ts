// =====================================
// MOLECULE — ORDER ITEM
// =====================================

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-item',
  standalone: true,
  templateUrl: './order-item.html',
  styleUrl: './order-item.css'
})
export class OrderItemComponent {

  @Input() product = '';

  @Input() quantity = 0;

}