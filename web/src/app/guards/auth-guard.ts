import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth/auth';

/** Solo deja entrar a las pantallas internas con sesión iniciada. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.estaAutenticado() || inject(Router).createUrlTree(['/login']);
};

/** Si ya hay sesión, el login y el registro llevan directo al panel. */
export const invitadoGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return !auth.estaAutenticado() || inject(Router).createUrlTree(['/dashboard']);
};
