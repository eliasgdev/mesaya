// =====================================
// PAGE — MESAS PAGE
// =====================================

import { Component } from '@angular/core';

import { DashboardLayoutComponent } from '../../component/organisms/dashboard-layout/dashboard-layout';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { PageHeaderComponent } from '../../component/organisms/page-header/page-header';
import { MesasGridComponent } from '../../component/organisms/mesas-grid/mesas-grid';

@Component({
  selector: 'app-mesas-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    PageHeaderComponent,
    MesasGridComponent
  ],
  templateUrl: './mesas-page.html',
  styleUrl: './mesas-page.css'
})
export class MesasPageComponent {}