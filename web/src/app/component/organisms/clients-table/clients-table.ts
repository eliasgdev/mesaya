// =====================================
// ORGANISM — CLIENTS TABLE
// =====================================

import { Component } from '@angular/core';

import { TableActionsComponent } from '../../molecules/table-actions/table-actions';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [TableActionsComponent],
  templateUrl: './clients-table.html',
  styleUrl: './clients-table.css'
})
export class ClientsTableComponent {}