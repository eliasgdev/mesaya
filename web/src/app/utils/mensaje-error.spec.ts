import { HttpErrorResponse } from '@angular/common/http';
import { describe, expect, it } from 'vitest';

import { mensajeDeError } from './mensaje-error';

describe('mensajeDeError', () => {
  it('usa el mensaje que envía la API', () => {
    const e = new HttpErrorResponse({ status: 400, error: { mensaje: 'La mesa 2 ya está ocupada.' } });
    expect(mensajeDeError(e)).toBe('La mesa 2 ya está ocupada.');
  });

  it('une los errores de validación sin el nombre del campo', () => {
    const e = new HttpErrorResponse({ status: 400, error: { errores: ['email: Correo inválido', 'nombre: El nombre es obligatorio'] } });
    expect(mensajeDeError(e)).toBe('Correo inválido. El nombre es obligatorio');
  });

  it('explica cuando no hay conexión con el servidor', () => {
    expect(mensajeDeError(new HttpErrorResponse({ status: 0 }))).toContain('No hay conexión');
  });

  it('tiene un mensaje genérico para errores desconocidos', () => {
    expect(mensajeDeError(new Error('x'))).toBe('Ocurrió un error inesperado. Intenta de nuevo.');
  });
});
