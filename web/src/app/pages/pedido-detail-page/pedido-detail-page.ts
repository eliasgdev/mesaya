// =====================================
// PAGE — PEDIDO DETAIL PAGE
// =====================================

import { Component } from '@angular/core';

import { DashboardLayoutComponent } from '../../component/organisms/dashboard-layout/dashboard-layout';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PedidosDetailComponent } from '../../component/organisms/pedidos-detail/pedidos-detail';

@Component({
  selector: 'app-pedido-detail-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PedidosDetailComponent
  ],
  templateUrl: './pedido-detail-page.html',
  styleUrl: './pedido-detail-page.css'
})
export class PedidoDetailPageComponent {}