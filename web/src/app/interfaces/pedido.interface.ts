export type EstadoPedido = 'CREADA' | 'EN_PREPARACION' | 'ENTREGADA';

export interface DetallePedido {
  idDetalle: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  idPedido: number;
  idMesa: number;
  numeroMesa: number;
  idCliente: number | null;
  nombreCliente: string | null;
  idUsuario: number;
  nombreUsuario: string;
  fechaCreacion: string;
  estado: EstadoPedido;
  observaciones: string | null;
  total: number;
  detalles: DetallePedido[];
}

export interface ItemPedido {
  idProducto: number;
  cantidad: number;
}

export interface PedidoRequest {
  idMesa: number;
  idCliente: number | null;
  observaciones: string | null;
  items: ItemPedido[];
}

export interface DashboardResumen {
  productosActivos: number;
  mesasDisponibles: number;
  pedidosActivos: number;
  pedidosEntregadosHoy: number;
}

export const ETIQUETA_ESTADO_PEDIDO: Record<EstadoPedido, string> = {
  CREADA: 'Creado',
  EN_PREPARACION: 'En preparación',
  ENTREGADA: 'Entregado',
};

export const SIGUIENTE_ACCION_PEDIDO: Partial<Record<EstadoPedido, string>> = {
  CREADA: 'Pasar a preparación',
  EN_PREPARACION: 'Marcar como entregado',
};
