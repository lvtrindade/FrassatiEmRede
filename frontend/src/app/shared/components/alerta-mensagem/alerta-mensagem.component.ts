import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerta-mensagem',
  imports: [CommonModule],
  templateUrl: './alerta-mensagem.component.html',
  styleUrl: './alerta-mensagem.component.css'
})
export class AlertaMensagemComponent {
  @Input() mensagem: string = '';
  @Input() tipo: 'sucesso' | 'erro' | 'aviso' | ''=''
}
