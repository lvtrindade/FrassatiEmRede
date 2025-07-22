import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
=======
import { environment } from '../../../../environments/environments';
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
<<<<<<< HEAD
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }
=======
  styleUrls: ['./background.component.css'],
})
export class BackgroundComponent {
  private apiUrl = `${environment.apiUrl}/background`;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();
<<<<<<< HEAD
    console.log('Prevent Default chamado');
=======
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

    if (!this.selectedFile) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    const formData = new FormData();
    formData.append('background', this.selectedFile);

<<<<<<< HEAD

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
=======
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
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
