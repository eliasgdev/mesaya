import { HttpErrorResponse } from '@angular/common/http';

/** Convierte la respuesta de error de la API en un texto para mostrar al usuario. */
export function mensajeDeError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'No hay conexión con el servidor. Si es la primera visita, espera unos segundos: la API se está encendiendo.';
    }
    const cuerpo = error.error as { mensaje?: string; errores?: string[] } | null;
    if (cuerpo?.errores?.length) {
      return cuerpo.errores.map((e) => e.replace(/^[^:]+:\s*/, '')).join('. ');
    }
    if (cuerpo?.mensaje) return cuerpo.mensaje;
  }
  return 'Ocurrió un error inesperado. Intenta de nuevo.';
}
