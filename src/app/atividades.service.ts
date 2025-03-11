import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {
  private apiUrl = 'http://localhost/src/app/backend/getAtividades.php';

  constructor(private http: HttpClient) { }

  getAtividades(): Observable <any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
