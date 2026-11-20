export interface Cliente {
  idCliente: number;
  nombre: string;
  telefono: string | null;
  email: string;
  fechaRegistro: string;
}

export interface ClienteRequest {
  nombre: string;
  telefono: string | null;
  email: string;
}
