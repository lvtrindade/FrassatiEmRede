import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class CardAtividadeComponent {
  @Input() atividade!: any;
  @Input() modoAdmin = false;

  @Output() editar = new EventEmitter<number>();
  @Output() excluir = new EventEmitter<number>();

  menuAberto = false;

  onEditar() {
    this.editar.emit(this.atividade.id);
    this.menuAberto = false;
  }

  onExcluir() {
    this.excluir.emit(this.atividade.id);
    this.menuAberto = false;
  }

  formatarData(data: string): string {
    if (!data || data === '0000-00-00') return 'Data não disponível';
    const date = new Date(`${data}T00:00:00-03:00`);
    return isNaN(date.getTime())
      ? 'Data inválida'
      : date.toLocaleDateString('pt-BR');
  }
}
