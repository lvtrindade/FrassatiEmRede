import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {
  private apiUrl = 'http://localhost/src/app/backend';

  constructor(private http: HttpClient) { }

  getAtividades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAtividades.php`);
  }

  excluirAtividade(atividadeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/excluir-atividade.php?id=${atividadeId}`);
  }

  editarAtividade(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/editar-atividade.php`, formData, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError(error => {
        console.error('Erro na requisição:', error);
        throw error;
      })
    );
  }
}