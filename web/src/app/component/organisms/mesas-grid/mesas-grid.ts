// =====================================
// ORGANISM — MESAS GRID
// =====================================

import { Component, input, output } from '@angular/core';

import { MesaCardComponent } from '../../molecules/mesa-card/mesa-card';
import { Mesa } from '../../../interfaces/mesa.interface';

@Component({
  selector: 'app-mesas-grid',
  standalone: true,
  imports: [MesaCardComponent],
  templateUrl: './mesas-grid.html',
  styleUrl: './mesas-grid.css',
})
export class MesasGridComponent {
  readonly mesas = input<Mesa[]>([]);
  readonly editar = output<Mesa>();
  readonly eliminar = output<Mesa>();
}
