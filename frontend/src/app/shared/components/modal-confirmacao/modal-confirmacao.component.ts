import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.css',
})
export class ModalConfirmacaoComponent {
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = 'Tem certeza que deseja prosseguir?';
  @Input() textoConfirmar: string = 'Confirmar';
  @Input() textoCancelar: string = 'Cancelar';

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
}
