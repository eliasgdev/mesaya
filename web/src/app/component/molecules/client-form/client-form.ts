// =====================================
// MOLECULE — CLIENT FORM
// =====================================

import { Component, OnInit, input, output, signal } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { Cliente, ClienteRequest } from '../../../interfaces/cliente.interface';

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientFormComponent implements OnInit {
  readonly cliente = input<Cliente | null>(null);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly guardar = output<ClienteRequest>();
  readonly cancelar = output<void>();

  readonly nombre = signal('');
  readonly email = signal('');
  readonly telefono = signal('');
  readonly errorLocal = signal<string | null>(null);

  ngOnInit(): void {
    const c = this.cliente();
    if (c) {
      this.nombre.set(c.nombre);
      this.email.set(c.email);
      this.telefono.set(c.telefono ?? '');
    }
  }

  onSubmit(): void {
    if (!this.nombre().trim()) {
      this.errorLocal.set('El nombre es obligatorio.');
      return;
    }
    if (!CORREO_VALIDO.test(this.email().trim())) {
      this.errorLocal.set('Escribe un correo válido.');
      return;
    }
    this.errorLocal.set(null);
    this.guardar.emit({
      nombre: this.nombre().trim(),
      email: this.email().trim(),
      telefono: this.telefono().trim() || null,
    });
  }
}
