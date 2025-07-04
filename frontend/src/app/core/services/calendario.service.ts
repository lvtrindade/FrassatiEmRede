import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private apiUrl = `${environment.apiUrl}/evento`;

  constructor(private http: HttpClient) { }

  listarEventos(): Observable<{ cod: number, mensagem: string, data: Evento[] }> {
    return this.http.get<{ cod: number, mensagem: string, data: Evento[] }>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<{ cod: number, mensagem: string, data: Evento[] }> {
    return this.http.get<{ cod:number, mensagem: string, data: Evento[] }>(`this.apiUrl/${id}`);
  }

  criarEvento(evento: Evento): Observable<{ cod: number, mensagem: string, data: Evento[] }>  {
    return this.http.post<{ cod: number, mensagem: string, data: Evento[] }>(this.apiUrl, evento);
  }

  editarEvento(id: number, evento: Evento): Observable<{ cod: number, mensagem: string, data: Evento[] }>  {
    return this.http.put<{ cod: number, mensagem: string, data: Evento[] }>(`this.apiUrl/${id}`, evento);
  }

  excluirEvento(id: number): Observable<{ cod: number, mensagem: string, data: Evento[] }> {
    return this.http.delete<{ cod:number, mensagem: string, data: Evento[] }>(`this.apiUrl/${id}`);
  }
}
