// =====================================
// ORGANISM — PRODUCTS TABLE
// =====================================

import { Component } from '@angular/core';

import { TableActionsComponent } from '../../molecules/table-actions/table-actions';
import { TableTagComponent } from '../../atoms/table-tag/table-tag';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    TableActionsComponent,
    TableTagComponent
  ],
  templateUrl: './products-table.html',
  styleUrl: './products-table.css'
})
export class ProductsTableComponent {}