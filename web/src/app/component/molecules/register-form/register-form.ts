// =====================================
// MOLECULE — REGISTER FORM
// =====================================

import { Component, input, output, signal } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { RegistroRequest } from '../../../interfaces/usuario.interface';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterFormComponent {
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly registrar = output<RegistroRequest>();

  readonly nombre = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly errorLocal = signal<string | null>(null);

  onSubmit(): void {
    if (!this.nombre().trim() || !this.email().trim()) {
      this.errorLocal.set('Escribe tu nombre y tu correo.');
      return;
    }
    if (this.password().length < 6) {
      this.errorLocal.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    this.errorLocal.set(null);
    this.registrar.emit({ nombre: this.nombre().trim(), email: this.email().trim(), password: this.password() });
  }
}
