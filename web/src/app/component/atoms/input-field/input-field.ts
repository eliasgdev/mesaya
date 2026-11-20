// =====================================
// ATOM — INPUT FIELD
// =====================================

import { Component, input, model } from '@angular/core';

let siguienteId = 0;

@Component({
  selector: 'app-input-field',
  standalone: true,
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputFieldComponent {
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input<'text' | 'email' | 'password' | 'tel' | 'search' | 'url'>('text');
  readonly autocomplete = input('off');
  readonly required = input(false);
  readonly maxlength = input<number | null>(null);
  readonly value = model('');
  readonly id = `campo-${++siguienteId}`;

  actualizar(evento: Event): void {
    this.value.set((evento.target as HTMLInputElement).value);
  }
}
