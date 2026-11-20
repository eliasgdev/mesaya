import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Mesa, MesaRequest } from '../../interfaces/mesa.interface';

@Injectable({ providedIn: 'root' })
export class MesasService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/mesas`;

  listar() {
    return this.http.get<Mesa[]>(this.url);
  }

  crear(datos: MesaRequest) {
    return this.http.post<Mesa>(this.url, datos);
  }

  actualizar(id: number, datos: MesaRequest) {
    return this.http.put<Mesa>(`${this.url}/${id}`, datos);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
