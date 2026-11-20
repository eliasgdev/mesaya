import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Cliente, ClienteRequest } from '../../interfaces/cliente.interface';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/clientes`;

  listar(busqueda = '') {
    const params = busqueda.trim() ? new HttpParams().set('busqueda', busqueda.trim()) : undefined;
    return this.http.get<Cliente[]>(this.url, { params });
  }

  crear(datos: ClienteRequest) {
    return this.http.post<Cliente>(this.url, datos);
  }

  actualizar(id: number, datos: ClienteRequest) {
    return this.http.put<Cliente>(`${this.url}/${id}`, datos);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
