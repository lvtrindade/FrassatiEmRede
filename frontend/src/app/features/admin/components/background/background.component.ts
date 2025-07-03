import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})
export class BackgroundComponent {
  private apiUrl = `${environment.apiUrl}/background`;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();

    if (!this.selectedFile) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    const formData = new FormData();
    formData.append('background', this.selectedFile);

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response: any) => {
        if (response.cod === 200) {
          alert(response.mensagem);
        } else {
          alert(response.mensagem || 'Erro desconhecido');
        }
      },
      error: (error) => {
        console.error('Erro ao enviar o arquivo:', error);
        alert('Erro ao enviar o arquivo. Verifique o console.');
      },
    });
  }
}
