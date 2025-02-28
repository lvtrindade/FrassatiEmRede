import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();
    console.log('Prevent Default chamado');

    if (!this.selectedFile) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    const formData = new FormData();
    formData.append('background', this.selectedFile);


    this.http.post('http://localhost/src/app/backend/change-bg.php', formData)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            alert(response.success); 
          } else if (response.error) {
            alert(response.error);
          }
        },
        error: (error) => {
          console.error('Erro ao enviar o arquivo:', error);
          alert('Erro ao enviar o arquivo. Verifique o console para mais detalhes.');
        }
      });
  }
}