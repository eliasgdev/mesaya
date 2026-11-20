import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, RegistroRequest, Usuario } from '../../interfaces/usuario.interface';

interface Sesion {
  token: string;
  expira: number;
  usuario: Usuario;
}

const CLAVE_SESION = 'mesaya.sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly url = `${environment.apiUrl}/auth`;

  private readonly sesion = signal<Sesion | null>(this.leerSesion());

  readonly usuario = computed(() => this.sesion()?.usuario ?? null);

  estaAutenticado(): boolean {
    const s = this.sesion();
    if (s && s.expira <= Date.now()) {
      this.limpiar();
      return false;
    }
    return s !== null;
  }

  token(): string | null {
    return this.estaAutenticado() ? this.sesion()!.token : null;
  }

  login(datos: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, datos).pipe(tap((r) => this.guardar(r)));
  }

  registrar(datos: RegistroRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/registro`, datos).pipe(tap((r) => this.guardar(r)));
  }

  cerrarSesion(): void {
    this.limpiar();
    this.router.navigate(['/login']);
  }

  private guardar(r: LoginResponse): void {
    const sesion: Sesion = { token: r.token, usuario: r.usuario, expira: Date.now() + r.expiraEnSegundos * 1000 };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    this.sesion.set(sesion);
  }

  private limpiar(): void {
    localStorage.removeItem(CLAVE_SESION);
    this.sesion.set(null);
  }

  private leerSesion(): Sesion | null {
    try {
      const guardada = localStorage.getItem(CLAVE_SESION);
      const sesion = guardada ? (JSON.parse(guardada) as Sesion) : null;
      return sesion && sesion.expira > Date.now() ? sesion : null;
    } catch {
      return null;
    }
  }
}
