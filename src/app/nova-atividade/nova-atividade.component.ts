import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nova-atividade',
  imports: [FormsModule, CommonModule],
  templateUrl: './nova-atividade.component.html',
  styleUrl: './nova-atividade.component.css'
})
export class NovaAtividadeComponent {
  titulo: string = '';
  dataAtividade: string = '';
  descricao: string = '';
  imagemPrincipal: { file: File, base64: string } | null = null;
  imagensGaleria: { file: File, base64: string }[] = [];
  tags: { id: number, nome: string }[] = []; // Lista de tags disponíveis
  tagSelecionada: number | null = null; // ID da tag selecionada

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarTags();
  }

  // Carrega as tags disponíveis do backend
  carregarTags() {
    this.http.get('http://localhost/src/app/backend/listarTags.php')
      .subscribe({
        next: (res: any) => {
          this.tags = res;
        },
        error: (err) => {
          console.error('Erro ao carregar tags:', err);
        }
      });
  }

  // Captura a imagem principal
  onImagemPrincipalSelecionada(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagemPrincipal = { file, base64: reader.result as string };
    };
    reader.readAsDataURL(file);
  }

  // Captura as imagens da galeria
  onGaleriaSelecionada(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagensGaleria.push({ file, base64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove uma imagem da galeria
  removerImagemGaleria(index: number) {
    this.imagensGaleria.splice(index, 1);
  }

  // Envia o formulário
  enviarAtividade() {
    const dadosAtividade = {
      titulo: this.titulo,
      dataAtividade: this.formatarDataParaBackend(this.dataAtividade),
      descricao: this.descricao,
      imagemPrincipal: this.imagemPrincipal?.base64 || null,
      imagensGaleria: this.imagensGaleria.map(imagem => imagem.base64),
      tag: this.tagSelecionada // Envia apenas o ID da tag selecionada
    };

    this.http.post('http://localhost/src/app/backend/addAtividade.php', dadosAtividade)
      .subscribe({
        next: (res: any) => {
          console.log('Resposta do backend:', res);
          alert(res.mensagem);
        },
        error: (err) => {
          console.error('Erro ao enviar dados:', err);
          alert('Erro ao criar atividade.');
        }
      });
  }

  // Converte a data de DD-MM-AAAA para AAAA-MM-DD
  private formatarDataParaBackend(data: string): string {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  }
}
