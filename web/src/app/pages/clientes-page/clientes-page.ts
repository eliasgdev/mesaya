// =====================================
// PAGE — CLIENTES PAGE
// =====================================

import { Component } from '@angular/core';

import { DashboardLayoutComponent } from '../../component/organisms/dashboard-layout/dashboard-layout';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { TableSearchComponent } from '../../component/molecules/table-search/table-search';
import { ClientsTableComponent } from '../../component/organisms/clients-table/clients-table';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    TableSearchComponent,
    ClientsTableComponent
  ],
  templateUrl: './clientes-page.html',
  styleUrl: './clientes-page.css'
})
export class ClientesPageComponent {}