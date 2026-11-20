// =====================================
// ORGANISM — DASHBOARD CARDS
// =====================================

import { Component } from '@angular/core';

import { StatsCardComponent } from '../../molecules/stats-card/stats-card';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [StatsCardComponent],
  templateUrl: './dashboard-cards.html',
  styleUrl: './dashboard-cards.css'
})
export class DashboardCardsComponent {}