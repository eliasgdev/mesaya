// ===============================
// ATOM — BADGE STATUS
// ===============================

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge-status.html',
  styleUrl: './badge-status.css'
})
export class BadgeStatusComponent {

  @Input() status = '';

}