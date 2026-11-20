// =====================================
// PAGE — DASHBOARD PAGE
// =====================================

import { Component } from '@angular/core';

import { DashboardLayoutComponent } from '../../component/organisms/dashboard-layout/dashboard-layout';
import { NavbarComponent } from '../../component/organisms/navbar/navbar';
import { DashboardCardsComponent } from '../../component/organisms/dashboard-cards/dashboard-cards';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    NavbarComponent,
    DashboardCardsComponent
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPageComponent {}