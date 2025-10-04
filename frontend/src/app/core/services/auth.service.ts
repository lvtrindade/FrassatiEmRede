import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, senha: string) {
    return this.http.post(
      `${this.apiUrl}/login`,
      { usuario, senha },
      {
        withCredentials: true,
      }
    );
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.router.navigate(['/admin/login']);
      },
      error: () => {
        localStorage.removeItem('user');
        this.router.navigate(['/admin/login']);
      },
    });
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // token está no cookie
  }
}
