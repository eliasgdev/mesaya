// =====================================
// PAGE — PRODUCTOS PAGE
// =====================================

import { Component } from '@angular/core';

import { DashboardLayoutComponent } from '../../component/organisms/dashboard-layout/dashboard-layout';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { TableSearchComponent } from '../../component/molecules/table-search/table-search';
import { ProductsTableComponent } from '../../component/organisms/products-table/products-table';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    TableSearchComponent,
    ProductsTableComponent
  ],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css'
})
export class ProductosPageComponent {}