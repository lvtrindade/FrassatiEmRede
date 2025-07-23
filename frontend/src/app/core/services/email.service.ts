import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email`;

  constructor(private http: HttpClient) {}

  sendEmail(emailData: {
    name: string,
    email: string,
    telephone: string,
    section: string,
    content: string
  }) {
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
