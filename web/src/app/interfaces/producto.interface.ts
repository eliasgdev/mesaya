export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
  imagenUrl: string | null;
  disponible: boolean;
  stock: number;
}

export type ProductoRequest = Omit<Producto, 'idProducto'>;
