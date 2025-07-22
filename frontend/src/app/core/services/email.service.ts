import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { environment } from '../../environments/environments';
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

@Injectable({
  providedIn: 'root'
})
export class EmailService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost/src/app/backend/email.php';

  constructor(private http: HttpClient) { }

  sendEmail(emailData: { name: string, email: string, telephone: string, section: string, content: string }) {
    return this.http.post(this.apiUrl, emailData, { responseType: 'json' });
  }
}
=======
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
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
