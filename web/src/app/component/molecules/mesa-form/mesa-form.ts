// =====================================
// MOLECULE — MESA FORM
// =====================================

import { Component, OnInit, computed, input, output, signal } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { InputNumberComponent } from '../../atoms/input-number/input-number';
import { OpcionSelect, SelectFieldComponent } from '../../atoms/select-field/select-field';
import { ETIQUETA_ESTADO_MESA, EstadoMesa, Mesa, MesaRequest } from '../../../interfaces/mesa.interface';

@Component({
  selector: 'app-mesa-form',
  standalone: true,
  imports: [InputNumberComponent, SelectFieldComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './mesa-form.html',
  styleUrl: './mesa-form.css',
})
export class MesaFormComponent implements OnInit {
  readonly mesa = input<Mesa | null>(null);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly guardar = output<MesaRequest>();
  readonly cancelar = output<void>();

  readonly numero = signal<number | null>(null);
  readonly capacidad = signal<number | null>(4);
  readonly estado = signal<string>('DISPONIBLE');
  readonly errorLocal = signal<string | null>(null);

  // Una mesa ocupada se libera entregando o eliminando su pedido, no a mano.
  readonly ocupada = computed(() => this.mesa()?.estado === 'OCUPADA');
  readonly estados: OpcionSelect[] = (['DISPONIBLE', 'RESERVADA'] as EstadoMesa[]).map((e) => ({
    valor: e,
    etiqueta: ETIQUETA_ESTADO_MESA[e],
  }));

  ngOnInit(): void {
    const m = this.mesa();
    if (m) {
      this.numero.set(m.numero);
      this.capacidad.set(m.capacidad);
      this.estado.set(m.estado);
    }
  }

  onSubmit(): void {
    const numero = this.numero();
    const capacidad = this.capacidad();
    if (!numero || numero < 1 || !Number.isInteger(numero)) {
      this.errorLocal.set('El número de mesa debe ser un entero mayor a 0.');
      return;
    }
    if (!capacidad || capacidad < 1 || !Number.isInteger(capacidad)) {
      this.errorLocal.set('La capacidad debe ser de al menos 1 persona.');
      return;
    }
    this.errorLocal.set(null);
    this.guardar.emit({ numero, capacidad, estado: this.estado() as EstadoMesa });
  }
}
