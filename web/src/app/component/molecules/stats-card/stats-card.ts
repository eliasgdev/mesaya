// =====================================
// MOLECULE — STATS CARD
// =====================================

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
})
export class StatsCardComponent {
  readonly title = input('');
  readonly value = input<number | null>(0);
  readonly hint = input('');
  readonly link = input<string | null>(null);
}
