// =====================================
// ATOM — BADGE STATUS
// =====================================

import { Component, computed, input } from '@angular/core';

const ETIQUETAS: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADA: 'Ocupada',
  RESERVADA: 'Reservada',
  CREADA: 'Creado',
  EN_PREPARACION: 'En preparación',
  ENTREGADA: 'Entregado',
};

@Component({
  selector: 'app-badge-status',
  standalone: true,
  templateUrl: './badge-status.html',
  styleUrl: './badge-status.css',
})
export class BadgeStatusComponent {
  readonly status = input.required<string>();
  readonly etiqueta = computed(() => ETIQUETAS[this.status()] ?? this.status());
}
