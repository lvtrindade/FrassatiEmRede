<<<<<<< HEAD
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
  dataAtividade: string = ''; // Já está no formato YYYY-MM-DD
  descricao: string = '';
  imagemPrincipal: File | null = null;
  imagensGaleria: File[] = [];
  tags: { id: number, nome: string }[] = []; // Lista de tags disponíveis
  tagSelecionada: number | null = null; // ID da tag selecionada

  constructor(private http: HttpClient) { }
=======
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsService } from '../../../../core/services/tags.service';
import { AtividadesService } from '../../../../core/services/atividades.service';

@Component({
  selector: 'app-nova-atividade',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nova-atividade.component.html',
  styleUrl: './nova-atividade.component.css',
})
export class NovaAtividadeComponent {
  titulo = '';
  data_atividade = '';
  descricao = '';
  imagem_principal: File | null = null;
  imagens_galeria: File[] = [];
  tags: { id: number; nome: string }[] = [];
  tag_selecionada: number | null = null;

  constructor(
    private tagService: TagsService,
    private atividadesService: AtividadesService
  ) {}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

  ngOnInit() {
    this.carregarTags();
  }

<<<<<<< HEAD
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
    this.imagemPrincipal = file;
  }

  // Captura as imagens da galeria
  onGaleriaSelecionada(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imagensGaleria.push(files[i]);
    }
  }

  // Remove uma imagem da galeria
  removerImagemGaleria(index: number) {
    this.imagensGaleria.splice(index, 1);
  }

  // Converte File em URL para pré-visualização
=======
  carregarTags() {
    this.tagService.getTags().subscribe({
      next: (res) => {
        this.tags = res.data;
        console.log('Tags carregadas: ', this.tags);
      },
      error: (err) => {
        console.error('Erro ao carregar tags: ', err);
      }
    });
  }

  onImagemPrincipalSelecionada(event: any) {
    this.imagem_principal = event.target.files[0];
  }

  onGaleriaSelecionada(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imagens_galeria.push(files[i]);
    }
  }

  removerImagemGaleria(index: number) {
    this.imagens_galeria.splice(index, 1);
  }

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  getImagemUrl(file: File): string {
    return URL.createObjectURL(file);
  }

<<<<<<< HEAD
  // Envia o formulário
  enviarAtividade() {
    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('dataAtividade', this.dataAtividade); // Já está no formato YYYY-MM-DD
    formData.append('descricao', this.descricao);
    formData.append('tag', this.tagSelecionada?.toString() || '');

    if (this.imagemPrincipal) {
      formData.append('imagemPrincipal', this.imagemPrincipal);
    }

    this.imagensGaleria.forEach((imagem, index) => {
      formData.append(`imagensGaleria[${index}]`, imagem);
    });

    this.http.post('http://localhost/src/app/backend/addAtividade.php', formData)
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
}
=======
  enviarAtividade() {
    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('data_atividade', this.data_atividade);
    formData.append('descricao', this.descricao);
    formData.append('id_tag', `${this.tag_selecionada}`);

    if (this.imagem_principal) {
      formData.append('imagem_principal', this.imagem_principal);
    }

    this.imagens_galeria.forEach((imagem, index) => {
      formData.append(`imagens_galeria[${index}]`, imagem);
    });

    this.atividadesService.criarAtividade(formData).subscribe({
      next: (res: any) => {
        console.log('Resposta do backend:', res);
        alert(res.mensagem || 'Atividade criada com sucesso!');
        this.resetarFormulario();
      },
      error: (err) => {
        console.error('Erro ao criar atividade:', err);
        alert('Erro ao criar atividade.');
      }
    });
  }

  resetarFormulario() {
    this.titulo = '';
    this.data_atividade = '';
    this.descricao = '';
    this.imagem_principal = null;
    this.imagens_galeria = [];
    this.tag_selecionada = null;
  }
}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
