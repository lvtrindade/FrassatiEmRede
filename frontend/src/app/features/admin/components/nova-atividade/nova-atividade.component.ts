import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsService } from '../../../../core/services/tags.service';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { AlertaMensagemComponent } from '../../../../shared/components/alerta-mensagem/alerta-mensagem.component';

@Component({
  selector: 'app-nova-atividade',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaMensagemComponent],
  templateUrl: './nova-atividade.component.html',
  styleUrl: './nova-atividade.component.css',
})
export class NovaAtividadeComponent {
  loading = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' | 'aviso' | '' = '';

  titulo = '';
  data_atividade = '';
  descricao = '';
  imagem_principal: File | null = null;
  imagens_galeria: File[] = [];
  tags: { id: number; nome: string }[] = [];
  tag_selecionada: number | null = null;
  imagem_principal_url: string | null = null;
  galeria_urls: string[] = [];

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
      },
    });
  }

  onImagemPrincipalSelecionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagem_principal = file;
      this.imagem_principal_url = URL.createObjectURL(file);
    }
  }

  onGaleriaSelecionada(event: any) {
    const files: FileList = event.target.files;
    if (this.imagens_galeria.length + files.length > 15) {
      alert('Você pode enviar no máximo 15 fotos de cada vez.');
      return;
    }
    for (let i = 0; i < files.length; i++) {
      this.imagens_galeria.push(files[i]);
      this.galeria_urls.push(URL.createObjectURL(files[i]));
    }
  }

  removerImagemGaleria(index: number) {
    this.imagens_galeria.splice(index, 1);
    this.galeria_urls.splice(index, 1);
  }

  getImagemUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  enviarAtividade() {
    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('data_atividade', this.data_atividade);
    formData.append('descricao', this.descricao);
    formData.append('id_tag', `${this.tag_selecionada}`);

    if (this.imagem_principal)
      formData.append('imagem_principal', this.imagem_principal);
    this.imagens_galeria.forEach((imagem) =>
      formData.append('imagens_galeria[]', imagem)
    );

    this.loading = true;
    this.mensagem = '';
    this.tipoMensagem = '';

    this.atividadesService.criarAtividade(formData).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res.cod === 200 || res.cod === 201) {
          this.mensagem = res.mensagem || 'Atividade criada com sucesso!';
          this.tipoMensagem = 'sucesso';
          this.resetarFormulario();
        } else {
          this.mensagem = res.mensagem || 'Erro desconhecido';
          this.tipoMensagem = 'erro';
        }
      },
      error: (err) => {
        this.loading = false;
        this.mensagem = 'Erro ao criar atividade.';
        this.tipoMensagem = 'erro';
      },
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

  removerImagemPrincipal() {
    this.imagem_principal = null;
    this.imagem_principal_url = null;
  }
}
