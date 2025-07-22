import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Evento } from '../../../models/evento.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarioService } from '../../services/calendario.service';
import { TagsService } from '../../services/tags.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-evento-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-evento-form.component.html',
  styleUrl: './modal-evento-form.component.css',
})
export class ModalEventoFormComponent implements OnInit {
  @Input() evento: Evento | null = null;
  @Input() dataSelecionada: Date | null = null;
  @Output() fechar: EventEmitter<void> = new EventEmitter<void>();
  @Output() salvar: EventEmitter<void> = new EventEmitter<void>();

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
    if (this.form.invalid) return;

    const dados = this.form.value;
    if (this.evento) {
      this.calendarioService
        .editarEvento(this.evento!.id!, dados)
        .subscribe(() => this.finalizar());
    } else {
      this.calendarioService
        .criarEvento(dados)
        .subscribe(() => this.finalizar());
    }
  }

  finalizar() {
    this.salvar.emit();
    this.fechar.emit();
  }
}
