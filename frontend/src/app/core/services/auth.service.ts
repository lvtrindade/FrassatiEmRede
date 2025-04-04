import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expira');
    this.router.navigate(['/admin/login']);
  }
}
