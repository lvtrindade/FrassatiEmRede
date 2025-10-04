import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edicao',
  templateUrl: './modal-edicao.component.html',
  styleUrls: ['./modal-edicao.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ModalEdicaoComponent implements OnChanges {
  @Input() atividadeEditando: any;
  @Input() tags: { id: number; nome: string }[] = [];
  @Input() imagensGaleria: { file: File; url: string }[] = [];
  @Input() imagensExistenteGaleria: any[] = [];

  @Output() salvar = new EventEmitter<FormData>();
  @Output() fecharModal = new EventEmitter<void>();
  @Output() onImagemPrincipalSelecionada = new EventEmitter<Event>();
  @Output() onGaleriaSelecionada = new EventEmitter<Event>();
  @Output() removerImagemExistente = new EventEmitter<number>();
  @Output() removerNovaImagemGaleria = new EventEmitter<number>();

  imagemPrincipalPreview: string | null = null;
  novaImagemPrincipalFile: File | null = null;
  imagensExistenteGaleriaUrls: { id: number; url: string }[] = [];
  novasImagensParaRemover: number[] = [];

  ngOnChanges() {
    this.imagensExistenteGaleriaUrls = this.imagensExistenteGaleria.map(
      (img) => ({
        id: img.id,
        url: 'data:image/png;base64,' + img.imagem,
      })
    );
  }

  onImagemPrincipalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.novaImagemPrincipalFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPrincipalPreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.onImagemPrincipalSelecionada.emit(event);
    }
  }

  removerImagemExistenteClick(id: number) {
    this.removerImagemExistente.emit(id);
  }

  removerNovaImagemGaleriaClick(index: number) {
    this.novasImagensParaRemover.push(index);
    this.imagensGaleria.splice(index, 1);
    this.removerNovaImagemGaleria.emit(index);
  }

  onSalvar() {
    const formData = new FormData();
    formData.append('titulo', this.atividadeEditando.titulo);
    formData.append('descricao', this.atividadeEditando.descricao);
    formData.append('data_atividade', this.atividadeEditando.data_atividade);
    formData.append('id_tag', this.atividadeEditando.id_tag);

    if (this.novaImagemPrincipalFile) {
      formData.append('imagem_principal', this.novaImagemPrincipalFile);
    }

    this.imagensGaleria.forEach((img, idx) => {
      formData.append('imagens_galeria[]', img.file);
    });
    this.salvar.emit(formData);
  }
}
