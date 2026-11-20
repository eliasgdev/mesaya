export type EstadoMesa = 'DISPONIBLE' | 'OCUPADA' | 'RESERVADA';

export interface Mesa {
  idMesa: number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
}

export type MesaRequest = Omit<Mesa, 'idMesa'>;

export const ETIQUETA_ESTADO_MESA: Record<EstadoMesa, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADA: 'Ocupada',
  RESERVADA: 'Reservada',
};
