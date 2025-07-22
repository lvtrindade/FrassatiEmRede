export interface ApiResponse<T> {
  cod: number;
  mensagem: string;
  data: T;
}
