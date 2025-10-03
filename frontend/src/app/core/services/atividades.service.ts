import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { Atividade } from '../../models/atividade.model';
import { ApiResponse } from '../../models/apiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService {
  private apiUrl = `${environment.apiUrl}/atividades`;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getAtividades(): Observable<ApiResponse<Atividade[]>> {
    return this.http.get<ApiResponse<Atividade[]>>(this.apiUrl);
  }

  buscarPorId(
    id: number
  ): Observable<{ cod: number; mensagem: string; data: Atividade }> {
    return this.http.get<{ cod: number; mensagem: string; data: Atividade }>(
      `${this.apiUrl}/${id}`
    );
  }

  excluirAtividade(atividadeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${atividadeId}`);
  }

  editarAtividade(id: number, formData: FormData): Observable<any> {
    formData.append('_method', 'PUT');

    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http
      .post(`${this.apiUrl}/${id}`, formData, {
        headers,
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.error('Erro na requisição:', error);
          throw error;
        })
      );
  }

  criarAtividade(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ Accept: 'application/json' });

    return this.http
      .post(`${this.apiUrl}`, formData, {
        headers,
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao criar atividade:', error);
          throw error;
        })
      );
  }
}
