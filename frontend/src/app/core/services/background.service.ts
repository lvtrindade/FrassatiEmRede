import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private apiUrl = `${environment.apiUrl}/background`;

  constructor(private http: HttpClient) {}

  getBackgroundImage(): Observable<{ imagem: string }> {
    return this.http.get<{ imagem: string }>(this.apiUrl);
  } 
}
