import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edicao',
  templateUrl: './modal-edicao.component.html',
  styleUrls: ['./modal-edicao.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ModalEdicaoComponent {
  @Input() atividadeEditando: any;
  @Input() tags: { id: number, nome: string }[] = [];

  @Input() imagensGaleria: { file: File, url: string }[] = [];
  @Input() imagensExistenteGaleria: any[] = [];

  @Output() salvar = new EventEmitter<void>();
  @Output() fecharModal = new EventEmitter<void>();
  @Output() onImagemPrincipalSelecionada = new EventEmitter<Event>();
  @Output() onGaleriaSelecionada = new EventEmitter<Event>();
  @Output() removerImagemExistente = new EventEmitter<number>();
  @Output() removerNovaImagemGaleria = new EventEmitter<number>();
}
