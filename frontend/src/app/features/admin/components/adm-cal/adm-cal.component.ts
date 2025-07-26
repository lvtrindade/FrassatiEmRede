import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento } from '../../../../models/evento.model';
import { CalendarioService } from '../../../../core/services/calendario.service';
import { ModalEventoFormComponent } from '../../../../core/modals/modal-evento-form/modal-evento-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adm-cal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalEventoFormComponent],
  templateUrl: './adm-cal.component.html',
  styleUrl: './adm-cal.component.css',
})
export class AdmCalComponent implements OnInit {
  eventos: Evento[] = [];

  dataAtual = new Date();
  diasDoCalendario: any[] = [];
  modo: 'mes' | 'semana' = 'mes';

  eventoSelecionado: Evento | null = null;
  dataSelecionada: Date | null = null;
  eventoModalAberto = false;
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

  gerarAnosDisponiveis() {
    const anoAtual = new Date().getFullYear();
    this.anosDisponiveis = Array.from(
      { length: 10 },
      (_, i) => anoAtual - 5 + i
    );
  }

  carregarEventos() {
    this.calendarioService.listarEventos().subscribe((response) => {
      this.eventos = response.data.map((evento, index) => ({
        ...evento,
        hoverGroupId: `${evento.id}_${index}`, // garante unicidade
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
        .map((ev) => ({
          ...ev,
          isInicio: ev.data_inicio === dataISO,
          isFim: ev.data_fim === dataISO,
          mostrarTitulo: ev.data_inicio === dataISO || dia.getDay() === 0,
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
    const base = new Date(this.dataAtual);
    const domingo = new Date(base);
    domingo.setDate(domingo.getDate() - domingo.getDay());

    const dias: any[] = [];

    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingo);
      dia.setDate(domingo.getDate() + i);
      const dataISO = this.formatarDataISO(dia);

      const eventosDoDia = this.eventos
        .filter((ev) => dataISO >= ev.data_inicio && dataISO <= ev.data_fim)
        .map((ev) => {
          const isPrimeiraAparicaoNaSemana =
            ev.data_inicio === dataISO ||
            (new Date(ev.data_inicio) < domingo && i === 0);

          return {
            ...ev,
            isInicio: ev.data_inicio === dataISO,
            isFim: ev.data_fim === dataISO,
            mostrarTitulo: isPrimeiraAparicaoNaSemana,
          };
        });

      dias.push({
        data: new Date(dia),
        fora: false,
        eventos: eventosDoDia,
      });
    }

    return dias;
  }

  formatarDataISO(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  nomeDoMes(data: Date): string {
    return this.meses[data.getMonth()];
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
    this.dataSelecionada = null;
    this.eventoModalAberto = false;
  }

  ativarHoverGrupo(hoverGroupId: string) {
    this.hoverGroupAtivo = hoverGroupId;
  }

  desativarHoverGrupo() {
    this.hoverGroupAtivo = null;
  }

  isInicio(evento: Evento, dia: Date): boolean {
    return this.formatarDataISO(dia) === evento.data_inicio;
  }

  isFim(evento: Evento, dia: Date): boolean {
    return this.formatarDataISO(dia) === evento.data_fim;
  }

  recarregarEventos() {
    this.calendarioService.listarEventos().subscribe((resp) => {
      this.eventos = resp.data;
      this.gerarCalendario();
    });
  }

  excluirEvento() {
    if (!this.eventoSelecionado?.id) return;
    this.calendarioService.excluirEvento(this.eventoSelecionado.id).subscribe(() => {
      this.carregarEventos();
      this.fecharModal();
    });
  }
}
