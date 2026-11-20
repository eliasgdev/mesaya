import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Producto, ProductoRequest } from '../../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/productos`;

  listar() {
    return this.http.get<Producto[]>(this.url);
  }

  crear(datos: ProductoRequest) {
    return this.http.post<Producto>(this.url, datos);
  }

  actualizar(id: number, datos: ProductoRequest) {
    return this.http.put<Producto>(`${this.url}/${id}`, datos);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
