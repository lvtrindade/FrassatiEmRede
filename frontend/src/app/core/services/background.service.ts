import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
=======
import { environment } from '../../environments/environments';
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
<<<<<<< HEAD
  private apiUrl = '${enviroment.apiUrl}/get-background.php';
=======
  private apiUrl = `${environment.apiUrl}/background`;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

  constructor(private http: HttpClient) {}

  getBackgroundImage(): Observable<{ imagem: string }> {
    return this.http.get<{ imagem: string }>(this.apiUrl);
  } 
}
