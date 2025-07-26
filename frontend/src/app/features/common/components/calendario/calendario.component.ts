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
  hoverGroupAtivo: string | null = null;

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

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.gerarAnosDisponiveis();
    this.carregarEventos();
    this.gerarCalendario();
  }

  nomeDoMes(data: Date): string {
    return this.meses[data.getMonth()];
  }

  abrirModal(evento: Evento) {
    this.eventoSelecionado = evento;
  }

  fecharModal() {
    this.eventoSelecionado = null;
  }

  carregarEventos() {
    this.calendarioService.listarEventos().subscribe((response) => {
      this.eventos = response.data.map((evento, index) => ({
        ...evento,
        hoverGroupId: `${evento.id}_${index}`, // Único por evento
      }));
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

    const inicio = new Date(primeiroDia);
    inicio.setDate(inicio.getDate() - inicio.getDay());

    const fim = new Date(ultimoDia);
    fim.setDate(fim.getDate() + (6 - fim.getDay()));

    const dias: any[] = [];

    for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
      const dia = new Date(d);
      const dataISO = this.formatarDataISO(dia);

      const eventosDoDia = this.eventos
        .filter((ev) => dataISO >= ev.data_inicio && dataISO <= ev.data_fim)
        .map((evento) => ({
          ...evento,
          isInicio: evento.data_inicio === dataISO,
          isFim: evento.data_fim === dataISO,
          mostrarTitulo: evento.data_inicio === dataISO || dia.getDay() === 0,
        }));

      dias.push({
        data: new Date(dia),
        fora: dia.getMonth() !== this.dataAtual.getMonth(),
        eventos: eventosDoDia,
      });
    }

    return dias;
  }

  gerarDiasDaSemana(): any[] {
    const dias: any[] = [];
    const base = new Date(this.dataAtual);
    const domingo = new Date(base);
    domingo.setDate(base.getDate() - base.getDay());

    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingo);
      dia.setDate(domingo.getDate() + i);

      const dataISO = this.formatarDataISO(dia);

      const eventosDoDia = this.eventos
        .filter((ev) => dataISO >= ev.data_inicio && dataISO <= ev.data_fim)
        .map((evento) => ({
          ...evento,
          isInicio: evento.data_inicio === dataISO,
          isFim: evento.data_fim === dataISO,
          mostrarTitulo: evento.data_inicio === dataISO || dia.getDay() === 0,
        }));

      dias.push({
        data: new Date(dia),
        fora: false,
        eventos: eventosDoDia,
      });
    }

    return dias;
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

  isInicio(evento: Evento, dia: Date): boolean {
    return this.formatarDataISO(dia) === evento.data_inicio;
  }

  isFim(evento: Evento, dia: Date): boolean {
    return this.formatarDataISO(dia) === evento.data_fim;
  }

  ativarHoverGrupo(hoverGroupId: string) {
    this.hoverGroupAtivo = hoverGroupId;
  }

  desativarHoverGrupo() {
    this.hoverGroupAtivo = null;
  }
}
