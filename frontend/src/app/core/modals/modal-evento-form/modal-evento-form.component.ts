import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Evento } from '../../../models/evento.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarioService } from '../../services/calendario.service';
import { TagsService } from '../../services/tags.service';
import { CommonModule } from '@angular/common';
import { ModalConfirmacaoComponent } from "../../../shared/components/modal-confirmacao/modal-confirmacao.component";

@Component({
  selector: 'app-modal-evento-form',
  imports: [CommonModule, ReactiveFormsModule, ModalConfirmacaoComponent],
  templateUrl: './modal-evento-form.component.html',
  styleUrl: './modal-evento-form.component.css',
})
export class ModalEventoFormComponent implements OnInit {
  @Input() evento: Evento | null = null;
  @Input() dataSelecionada: Date | null = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<void>();
  @Output() salvarFalhou = new EventEmitter<string>();
  @Output() excluir = new EventEmitter<void>();

  form: FormGroup;
  tags: any[] = [];

  constructor(
    private fb: FormBuilder,
    private calendarioService: CalendarioService,
    private tagService: TagsService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_fim: ['', Validators.required],
      horario_inicio: ['', Validators.required],
      horario_fim: ['', Validators.required],
      id_tag: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarTags();

    if (this.evento) {
      this.form.patchValue(this.evento);
    } else if (this.dataSelecionada) {
      const dataStr = this.dataSelecionada.toISOString().split('T')[0];
      this.form.patchValue({ data_inicio: dataStr, data_fim: dataStr });
    }
  }

  carregarTags() {
    this.tagService.getTags().subscribe((resp) => {
      this.tags = resp.data;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.salvarFalhou.emit('Preencha todos os campos obrigatórios.');
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;
    if (this.evento) {
      this.calendarioService.editarEvento(this.evento!.id!, dados).subscribe({
        next: () => this.finalizar(),
        error: () => this.salvarFalhou.emit('Erro ao editar evento.'),
      });
    } else {
      this.calendarioService.criarEvento(dados).subscribe({
        next: () => this.finalizar(),
        error: () => this.salvarFalhou.emit('Erro ao criar evento.'),
      });
    }
  }

  finalizar() {
    this.salvar.emit();
    this.fechar.emit();
  }

  mostrarConfirmacaoExclusao = false;

  onExcluir() {
    this.mostrarConfirmacaoExclusao = true;
  }

  confirmarExclusao() {
    this.excluir.emit();
    this.mostrarConfirmacaoExclusao = false;
  }

  cancelarExclusao() {
    this.mostrarConfirmacaoExclusao = false;
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
