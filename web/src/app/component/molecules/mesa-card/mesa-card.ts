// =====================================
// MOLECULE — MESA CARD
// =====================================

import { Component, input, output } from '@angular/core';

import { BadgeStatusComponent } from '../../atoms/badge-status/badge-status';
import { Mesa } from '../../../interfaces/mesa.interface';
import { TableActionsComponent } from '../table-actions/table-actions';

@Component({
  selector: 'app-mesa-card',
  standalone: true,
  imports: [BadgeStatusComponent, TableActionsComponent],
  templateUrl: './mesa-card.html',
  styleUrl: './mesa-card.css',
})
export class MesaCardComponent {
  readonly mesa = input.required<Mesa>();
  readonly editar = output<void>();
  readonly eliminar = output<void>();
}
