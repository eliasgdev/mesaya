import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css'
})
export class StatsCardComponent {

  @Input() title = '';

  @Input() value = 0;

}