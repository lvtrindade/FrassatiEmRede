import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from '../../../models/evento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-evento',
  imports: [CommonModule],
  templateUrl: './modal-evento.component.html',
  styleUrl: './modal-evento.component.css'
})
export class ModalEventoComponent {
  @Input() evento!: Evento;
  @Output() fechar: EventEmitter<void> = new EventEmitter<void>();

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarHorario(hora: string): string {
    return hora?.slice(0, 5);
  }
}
