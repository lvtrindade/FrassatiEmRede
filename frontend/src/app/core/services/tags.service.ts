import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  getTags(): Observable<{
    cod: number;
    mensagem: string;
    data: { id: number; nome: string; cor: string }[];
  }> {
    return this.http.get<{
      cod: number;
      mensagem: string;
      data: { id: number; nome: string; cor: string }[];
    }>(this.apiUrl);
  }
}
