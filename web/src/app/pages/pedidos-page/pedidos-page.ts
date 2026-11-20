// =====================================
// PAGE — PEDIDOS PAGE
// =====================================

import { Component } from '@angular/core';

import { DashboardLayoutComponent } from '../../component/organisms/dashboard-layout/dashboard-layout';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { PedidosTableComponent } from '../../component/organisms/pedidos-table/pedidos-table';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    PedidosTableComponent
  ],
  templateUrl: './pedidos-page.html',
  styleUrl: './pedidos-page.css'
})
export class PedidosPageComponent {}