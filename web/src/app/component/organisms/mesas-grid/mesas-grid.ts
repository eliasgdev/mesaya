import { Component } from '@angular/core';

import { MesaCardComponent } from '../../molecules/mesa-card/mesa-card';

@Component({
  selector: 'app-mesas-grid',
  standalone: true,
  imports: [MesaCardComponent],
  templateUrl: './mesas-grid.html',
  styleUrl: './mesas-grid.css'
})
export class MesasGridComponent {}