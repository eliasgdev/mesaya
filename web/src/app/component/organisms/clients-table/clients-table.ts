// =====================================
// ORGANISM — CLIENTS TABLE
// =====================================

import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { TableActionsComponent } from '../../molecules/table-actions/table-actions';
import { Cliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [DatePipe, TableActionsComponent],
  templateUrl: './clients-table.html',
  styleUrl: './clients-table.css',
})
export class ClientsTableComponent {
  readonly clientes = input<Cliente[]>([]);
  readonly editar = output<Cliente>();
  readonly eliminar = output<Cliente>();
}
