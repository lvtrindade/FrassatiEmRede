import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {
  private apiUrl = `${environment.apiUrl}/atividades`;

  constructor(private http: HttpClient) {}

  getAtividades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  excluirAtividade(atividadeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${atividadeId}`);
  }

  editarAtividade(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    return this.http.post(`${this.apiUrl}`, formData, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError(error => {
        console.error('Erro na requisição:', error);
        throw error;
      })
    );
  }

  criarAtividade(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    return this.http.post(`${this.apiUrl}`, formData, {
      headers,
      responseType: 'json'
    }).pipe(
      catchError(error => {
        console.error('Erro ao criar atividade:', error);
        throw error;
      })
    );
  }
}
