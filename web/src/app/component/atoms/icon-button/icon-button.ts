// =====================================
// ATOM — ICON BUTTON
// =====================================

import { Component, input } from '@angular/core';

export type Icono = 'editar' | 'eliminar' | 'buscar' | 'ver' | 'salir' | 'mas' | 'menos';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css',
})
export class IconButtonComponent {
  readonly icon = input.required<Icono>();
  readonly label = input.required<string>();
  readonly type = input<'primary' | 'danger' | 'success' | 'secondary'>('secondary');
  readonly disabled = input(false);
}
