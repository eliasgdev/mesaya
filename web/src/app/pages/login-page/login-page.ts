// =====================================
// PAGE — LOGIN PAGE
// =====================================

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AppLogoComponent } from '../../component/atoms/app-logo/app-logo';
import { LinkTextComponent } from '../../component/atoms/link-text/link-text';
import { LoginFormComponent } from '../../component/molecules/login-form/login-form';
import { LoginRequest } from '../../interfaces/usuario.interface';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout';
import { AuthService } from '../../services/auth/auth';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AuthLayoutComponent, AppLogoComponent, LoginFormComponent, LinkTextComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);

  ingresar(datos: LoginRequest): void {
    this.cargando.set(true);
    this.error.set(null);
    this.auth.login(datos).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }
}
