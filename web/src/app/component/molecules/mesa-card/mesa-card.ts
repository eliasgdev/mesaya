// =====================================
// MOLECULE — MESA CARD
// =====================================

import { Component, Input } from '@angular/core';

import { BadgeStatusComponent } from '../../atoms/badge-status/badge-status';

@Component({
  selector: 'app-mesa-card',
  standalone: true,
  imports: [BadgeStatusComponent],
  templateUrl: './mesa-card.html',
  styleUrl: './mesa-card.css'
})
export class MesaCardComponent {

  @Input() number = 0;

  @Input() status = '';

}