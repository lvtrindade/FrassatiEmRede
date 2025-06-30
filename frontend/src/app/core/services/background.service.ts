import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private apiUrl = '${enviroment.apiUrl}/get-background.php';

  constructor(private http: HttpClient) {}

  getBackgroundImage(): Observable<{ imagem: string }> {
    return this.http.get<{ imagem: string }>(this.apiUrl);
  } 
}
