import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ItemPedido, Pedido, PedidoRequest } from '../../interfaces/pedido.interface';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/pedidos`;

  listar() {
    return this.http.get<Pedido[]>(this.url);
  }

  obtener(id: number) {
    return this.http.get<Pedido>(`${this.url}/${id}`);
  }

  crear(datos: PedidoRequest) {
    return this.http.post<Pedido>(this.url, datos);
  }

  avanzarEstado(id: number) {
    return this.http.patch<Pedido>(`${this.url}/${id}/estado`, null);
  }

  agregarItem(id: number, item: ItemPedido) {
    return this.http.post<Pedido>(`${this.url}/${id}/detalles`, item);
  }

  quitarItem(id: number, idDetalle: number) {
    return this.http.delete<Pedido>(`${this.url}/${id}/detalles/${idDetalle}`);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
