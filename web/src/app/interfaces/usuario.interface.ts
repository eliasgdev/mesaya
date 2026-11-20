export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistroRequest extends LoginRequest {
  nombre: string;
}

export interface LoginResponse {
  token: string;
  expiraEnSegundos: number;
  usuario: Usuario;
}
