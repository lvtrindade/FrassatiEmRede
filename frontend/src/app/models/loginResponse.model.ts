export interface LoginResponse {
  cod: number;
  mensagem: string;
  data: {
    id: number;
    role: string;
    usuario: string;
    token: string;
  };
}
