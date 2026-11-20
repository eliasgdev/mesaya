// =====================================
// MOLECULE — LOGIN FORM
// =====================================

import { Component, input, output, signal } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { LoginRequest } from '../../../interfaces/usuario.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent, ErrorMessageComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginFormComponent {
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly ingresar = output<LoginRequest>();

  readonly email = signal('');
  readonly password = signal('');
  readonly errorLocal = signal<string | null>(null);

  onSubmit(): void {
    if (!this.email().trim() || !this.password()) {
      this.errorLocal.set('Escribe tu correo y tu contraseña.');
      return;
    }
    this.errorLocal.set(null);
    this.ingresar.emit({ email: this.email().trim(), password: this.password() });
  }

  usarDemo(email: string, clave: string): void {
    this.email.set(email);
    this.password.set(clave);
  }
}
