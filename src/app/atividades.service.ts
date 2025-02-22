import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {
  private apiUrl = 'http://localhosto/src/app/backend';

  constructor(private http: HttpClient) { }

  getAtividades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAtividades.php`);
  }

  addAtividades(atividade: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addAtividade.php`, atividade);
  }
}
