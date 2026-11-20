import { Component } from '@angular/core';

import { TableActionsComponent } from '../../molecules/table-actions/table-actions';
import { TableTagComponent } from '../../atoms/table-tag/table-tag';

@Component({
  selector: 'app-pedidos-table',
  standalone: true,
  imports: [
    TableActionsComponent,
    TableTagComponent
  ],
  templateUrl: './pedidos-table.html',
  styleUrl: './pedidos-table.css'
})
export class PedidosTableComponent {}