import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
<<<<<<< HEAD

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost/backend/login.php';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post(this.loginUrl, body, { headers });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('Token no AutthService:', token);
    return !!token;
=======
import { environment } from '../../environments/environments';
import { LoginResponse } from '../../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, { usuario, senha }, { headers });
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  }

  logout(): void {
    localStorage.removeItem('authToken');
<<<<<<< HEAD
    localStorage.removeItem('expira');
=======
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    this.router.navigate(['/admin/login']);
  }
}
