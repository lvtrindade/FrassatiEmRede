import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento } from '../../../../models/evento.model';
import { CalendarioService } from '../../../../core/services/calendario.service';
import { ModalEventoComponent } from '../../../../core/modals/modal-evento/modal-evento.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule, FormsModule, ModalEventoComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  eventos: Evento[] = [];

  dataAtual = new Date();
  diasDoCalendario: any[] = [];
  modo: 'mes' | 'semana' = 'mes';

  eventoSelecionado: Evento | null = null;

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.gerarAnosDisponiveis();
    this.carregarEventos();
    this.gerarCalendario();
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

  abrirModal(evento: Evento) {
    this.eventoSelecionado = evento;
  }

  fecharModal() {
    this.eventoSelecionado = null;
  }

  carregarEventos() {
    this.calendarioService.listarEventos().subscribe((response) => {
      this.eventos = response.data;
      this.gerarCalendario();
    });
  }

  gerarCalendario() {
    if (this.modo === 'mes') {
      this.diasDoCalendario = this.gerarDiasDoMes();
    } else if (this.modo === 'semana') {
      this.diasDoCalendario = this.gerarDiasDaSemana();
    } else {
      console.log('Erro');
    }
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
        eventos: eventosDoDia,
      };
    });
  }

  formatarDataISO(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  mudarModo(novoModo: 'mes' | 'semana') {
    this.modo = novoModo;
    this.gerarCalendario();
  }

  proximo() {
    if (this.modo === 'mes') {
      this.dataAtual.setMonth(this.dataAtual.getMonth() + 1);
    } else {
      this.dataAtual.setDate(this.dataAtual.getDate() + 7);
    }
    this.sincronizarDataSelecionada();
    this.gerarCalendario();
  }

  anterior() {
    if (this.modo === 'mes') {
      this.dataAtual.setMonth(this.dataAtual.getMonth() - 1);
    } else {
      this.dataAtual.setDate(this.dataAtual.getDate() - 7);
    }
    this.sincronizarDataSelecionada();
    this.gerarCalendario();
  }

  sincronizarDataSelecionada() {
    this.dataAtualMes = this.dataAtual.getMonth();
    this.dataAtualAno = this.dataAtual.getFullYear();
  }

  meses = [
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

  anosDisponiveis: number[] = [];

  dataAtualMes = this.dataAtual.getMonth();
  dataAtualAno = this.dataAtual.getFullYear();

  gerarAnosDisponiveis() {
    const anoAtual = new Date().getFullYear();
    this.anosDisponiveis = Array.from(
      { length: 10 },
      (_, i) => anoAtual - 5 + i
    );
  }

  atualizarData() {
    this.dataAtual = new Date(this.dataAtualAno, this.dataAtualMes, 1);
    this.gerarCalendario();
  }

  ehHoje(data: Date): boolean {
    const hoje = new Date();
    return (
      data.getDate() === hoje.getDate() &&
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  }
}
