// =====================================
// MOLECULE — DASHBOARD SUMMARY
// =====================================

import { Component } from '@angular/core';

import { StatsCardComponent } from '../stats-card/stats-card';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [StatsCardComponent],
  templateUrl: './dashboard-summary.html',
  styleUrl: './dashboard-summary.css'
})
export class DashboardSummaryComponent {}