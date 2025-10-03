import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from '../../../models/evento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-evento',
  imports: [CommonModule],
  templateUrl: './modal-evento.component.html',
  styleUrl: './modal-evento.component.css',
})
export class ModalEventoComponent {
  @Input() evento!: Evento;
  @Output() fechar: EventEmitter<void> = new EventEmitter<void>();

  formatarHorario(horario: string): string {
    return horario?.slice(0, 5);
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
