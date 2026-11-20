// =====================================
// ATOM — INPUT NUMBER
// =====================================

import { Component, input, model } from '@angular/core';

let siguienteId = 0;

@Component({
  selector: 'app-input-number',
  standalone: true,
  templateUrl: './input-number.html',
  styleUrl: './input-number.css',
})
export class InputNumberComponent {
  readonly label = input('');
  readonly placeholder = input('');
  readonly min = input<number | null>(0);
  readonly step = input(1);
  readonly required = input(false);
  readonly value = model<number | null>(null);
  readonly id = `numero-${++siguienteId}`;

  actualizar(evento: Event): void {
    const texto = (evento.target as HTMLInputElement).value;
    this.value.set(texto === '' ? null : Number(texto));
  }
}
