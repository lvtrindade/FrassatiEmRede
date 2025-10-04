import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { CommonModule } from '@angular/common';
import { AlertaMensagemComponent } from '../../../../shared/components/alerta-mensagem/alerta-mensagem.component';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  imports: [CommonModule, AlertaMensagemComponent],
})
export class BackgroundComponent {
  private apiUrl = `${environment.apiUrl}/background`;

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  loading = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' | 'aviso' | '' = '';

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Criar URL para mostrar a prévia da imagem selecionada
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();

    if (!this.selectedFile) return;

    this.loading = true;
    this.mensagem = '';
    this.tipoMensagem = '';

    const formData = new FormData();
    formData.append('background', this.selectedFile);

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response: any) => {
        this.loading = false;

        if (response.cod === 200) {
          this.mensagem = response.mensagem || 'Arquivo enviado com sucesso!';
          this.tipoMensagem = 'sucesso';
          this.selectedFile = null;
          this.previewUrl = null;
        } else {
          this.mensagem = response.mensagem || 'Erro desconhecido';
          this.tipoMensagem = 'erro';
        }
      },
      error: (error) => {
        this.loading = false;
        this.mensagem = 'Erro ao enviar o arquivo.';
        this.tipoMensagem = 'erro';
      },
    });
  }
}
