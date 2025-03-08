import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost/src/app/backend/email.php';

  constructor(private http: HttpClient) { }

  sendEmail(emailData: { name: string, email: string, telephone: string, section: string, content: string }) {
    return this.http.post(this.apiUrl, emailData, { responseType: 'json' });
  }
}