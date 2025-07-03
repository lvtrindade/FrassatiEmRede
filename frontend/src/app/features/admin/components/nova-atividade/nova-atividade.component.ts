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
  dataAtividade = '';
  descricao = '';
  imagemPrincipal: File | null = null;
  imagensGaleria: File[] = [];
  tags: { id: number; nome: string }[] = [];
  tagSelecionada: number | null = null;

  constructor(
    private tagService: TagsService,
    private atividadesService: AtividadesService
  ) {}

  ngOnInit() {
    this.carregarTags();
  }

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
    this.imagemPrincipal = event.target.files[0];
  }

  onGaleriaSelecionada(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imagensGaleria.push(files[i]);
    }
  }

  removerImagemGaleria(index: number) {
    this.imagensGaleria.splice(index, 1);
  }

  getImagemUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  enviarAtividade() {
    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('dataAtividade', this.dataAtividade);
    formData.append('descricao', this.descricao);
    formData.append('tag', this.tagSelecionada?.toString() || '');

    if (this.imagemPrincipal) {
      formData.append('imagemPrincipal', this.imagemPrincipal);
    }

    this.imagensGaleria.forEach((imagem, index) => {
      formData.append(`imagensGaleria[${index}]`, imagem);
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
    this.dataAtividade = '';
    this.descricao = '';
    this.imagemPrincipal = null;
    this.imagensGaleria = [];
    this.tagSelecionada = null;
  }
}
