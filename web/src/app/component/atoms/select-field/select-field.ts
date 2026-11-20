// =====================================
// ATOM — SELECT FIELD
// =====================================

import { Component, input, model } from '@angular/core';

export interface OpcionSelect {
  valor: string;
  etiqueta: string;
}

let siguienteId = 0;

@Component({
  selector: 'app-select-field',
  standalone: true,
  templateUrl: './select-field.html',
  styleUrl: './select-field.css',
})
export class SelectFieldComponent {
  readonly label = input('');
  readonly options = input<OpcionSelect[]>([]);
  readonly placeholder = input('');
  readonly required = input(false);
  readonly selected = model('');
  readonly id = `seleccion-${++siguienteId}`;

  actualizar(evento: Event): void {
    this.selected.set((evento.target as HTMLSelectElement).value);
  }
}
