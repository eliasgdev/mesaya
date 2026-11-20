// =====================================
// PAGE — REGISTER PAGE
// =====================================

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AppLogoComponent } from '../../component/atoms/app-logo/app-logo';
import { LinkTextComponent } from '../../component/atoms/link-text/link-text';
import { RegisterFormComponent } from '../../component/molecules/register-form/register-form';
import { RegistroRequest } from '../../interfaces/usuario.interface';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout';
import { AuthService } from '../../services/auth/auth';
import { mensajeDeError } from '../../utils/mensaje-error';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [AuthLayoutComponent, AppLogoComponent, RegisterFormComponent, LinkTextComponent],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);

  registrar(datos: RegistroRequest): void {
    this.cargando.set(true);
    this.error.set(null);
    this.auth.registrar(datos).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error.set(mensajeDeError(e));
        this.cargando.set(false);
      },
    });
  }
}
