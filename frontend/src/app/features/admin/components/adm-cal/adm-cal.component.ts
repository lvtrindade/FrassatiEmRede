<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-cal',
  imports: [],
  templateUrl: './adm-cal.component.html',
  styleUrl: './adm-cal.component.css'
})
export class AdmCalComponent {
    constructor () {}
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { CalendarioService } from '../../../../core/services/calendario.service';
import { CommonModule } from '@angular/common';
import { ModalEventoFormComponent } from '../../../../core/modals/modal-evento-form/modal-evento-form.component';

@Component({
  selector: 'app-adm-cal',
  imports: [CommonModule, ModalEventoFormComponent],
  templateUrl: './adm-cal.component.html',
  styleUrl: './adm-cal.component.css',
})
export class AdmCalComponent implements OnInit {
  eventos: Evento[] = [];
  modo: 'mes' | 'semana' = 'mes';
  dataAtual = new Date();
  diasDoCalendario: any[] = [];

  eventoSelecionado: Evento | null = null;
  eventoModalAberto = false;
  dataSelecionada: Date | null = null;

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.recarregarEventos();
    this.gerarCalendario();
  }

  recarregarEventos() {
    this.calendarioService.listarEventos().subscribe((resp) => {
      this.eventos = resp.data;
      this.gerarCalendario();
    });
  }

  gerarCalendario() {
    this.diasDoCalendario =
      this.modo === 'mes' ? this.gerarDiasDoMes() : this.gerarDiasDaSemana();
  }

  gerarDiasDoMes(): any[] {
    const primeiroDia = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth(),
      1
    );
    const ultimoDia = new Date(
      this.dataAtual.getFullYear(),
      this.dataAtual.getMonth() + 1,
      0
    );
    const dias: any[] = [];

    const inicio = new Date(primeiroDia);
    inicio.setDate(primeiroDia.getDate() - primeiroDia.getDay());

    const fim = new Date(ultimoDia);
    fim.setDate(ultimoDia.getDate() + (6 - ultimoDia.getDay()));

    for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
      const dia = new Date(d);
      const eventosDoDia = this.eventos
        .filter((ev) => ev.data_inicio === this.formatarDataISO(dia))
        .sort((a, b) => a.horario_inicio.localeCompare(b.horario_inicio));

      dias.push({
        data: new Date(dia),
        fora: dia.getMonth() !== this.dataAtual.getMonth(),
        eventos: eventosDoDia,
      });
    }

    return dias;
  }

  gerarDiasDaSemana(): any[] {
    const diaBase = new Date(this.dataAtual);
    const inicio = new Date(
      diaBase.setDate(diaBase.getDate() - diaBase.getDay())
    );

    return Array.from({ length: 7 }).map((_, i) => {
      const dia = new Date(inicio);
      dia.setDate(inicio.getDate() + i);

      const eventosDoDia = this.eventos
        .filter((ev) => ev.data_inicio === this.formatarDataISO(dia))
        .sort((a, b) => a.horario_inicio.localeCompare(b.horario_inicio));

      return {
        data: new Date(dia),
        fora: false,
        eventos: eventosDoDia,
      };
    });
  }

  formatarDataISO(data: Date): string {
    return data.toISOString().split('T')[0];
  }

  nomeDoMes(data: Date): string {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return meses[data.getMonth()];
  }

  mudarModo(novo: 'mes' | 'semana') {
    this.modo = novo;
    this.gerarCalendario();
  }

  proximo() {
    this.dataAtual = new Date(this.dataAtual);
    this.modo === 'mes'
      ? this.dataAtual.setMonth(this.dataAtual.getMonth() + 1)
      : this.dataAtual.setDate(this.dataAtual.getDate() + 7);
    this.gerarCalendario();
  }

  anterior() {
    this.dataAtual = new Date(this.dataAtual);
    this.modo === 'mes'
      ? this.dataAtual.setMonth(this.dataAtual.getMonth() - 1)
      : this.dataAtual.setDate(this.dataAtual.getDate() - 7);
    this.gerarCalendario();
  }

  clicarDia(data: Date, event: MouseEvent) {
    event.stopPropagation();
    this.dataSelecionada = data;
    this.eventoSelecionado = null;
    this.eventoModalAberto = true;
  }

  editarEvento(evento: Evento, event: MouseEvent) {
    event.stopPropagation();
    this.eventoSelecionado = evento;
    this.dataSelecionada = new Date(evento.data_inicio);
    this.eventoModalAberto = true;
  }

  abrirNovoEvento() {
    this.eventoSelecionado = null;
    this.dataSelecionada = null;
    this.eventoModalAberto = true;
  }

  fecharModal() {
    this.eventoSelecionado = null;
    this.eventoModalAberto = false;
    this.dataSelecionada = null;
  }
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
}
