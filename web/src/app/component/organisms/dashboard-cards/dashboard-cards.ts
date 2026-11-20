// =====================================
// ORGANISM — DASHBOARD CARDS
// =====================================

import { Component, input } from '@angular/core';

import { StatsCardComponent } from '../../molecules/stats-card/stats-card';
import { DashboardResumen } from '../../../interfaces/pedido.interface';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [StatsCardComponent],
  templateUrl: './dashboard-cards.html',
  styleUrl: './dashboard-cards.css',
})
export class DashboardCardsComponent {
  readonly resumen = input<DashboardResumen | null>(null);
}
