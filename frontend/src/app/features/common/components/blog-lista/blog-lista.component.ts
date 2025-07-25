import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { TagsService } from '../../../../core/services/tags.service';
import { AtividadeUtilService } from '../../../../core/utils/atividade-util.service';
import { CardAtividadeComponent } from '../../../../shared/components/cards/card-atividade/card-atividade.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, CardAtividadeComponent, RouterModule],
  templateUrl: './blog-lista.component.html',
  styleUrls: ['./blog-lista.component.css'],
})
export class BlogListaComponent implements OnInit {
  tags: { id: number; nome: string }[] = [];
  tagSelecionada: number | null = null;
  atividades: any[] = [];
  atividadesFiltradas: any[] = [];

  atividadesPorPagina: number = 20;
  paginaAtual: number = 1;
  totalPaginas: number = 1;

  constructor(
    private tagService: TagsService,
    private atividadesService: AtividadesService,
    private atividadeUtil: AtividadeUtilService
  ) {}

  ngOnInit() {
    this.carregarTags();
    this.loadAtividades();
  }

  carregarTags() {
    this.tagService.getTags().subscribe({
      next: (res) => {
        this.tags = res.data;
      },
      error: (err) => {
        console.error('Erro ao carregar tags: ', err);
      },
    });
  }

  loadAtividades(): void {
    this.atividadesService.getAtividades().subscribe({
      next: (response: any) => {
        if (response && response.data && response.data.length > 0) {
          this.atividades = response.data;
          this.filtrarAtividades();
        } else {
          this.atividades = [];
          this.atividadesFiltradas = [];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar atividades:', err);
      },
    });
  }

  filtrarAtividades(): void {
    const termo =
      (document.querySelector('input[type="text"]') as HTMLInputElement)
        ?.value || '';

    this.atividadesFiltradas = this.atividadeUtil.filtrarAtividadesPorTagETermo(
      this.atividades,
      this.tags,
      termo,
      this.tagSelecionada
    );
    this.totalPaginas = this.atividadeUtil.calcularTotalPaginas(
      this.atividadesFiltradas,
      this.atividadesPorPagina
    );
    this.paginaAtual = 1;
  }

  getAtividadesPaginaAtual(): any[] {
    const inicio = (this.paginaAtual - 1) * this.atividadesPorPagina;
    const fim = inicio + this.atividadesPorPagina;
    return this.atividadesFiltradas.slice(inicio, fim);
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  formatarData(data: string): string {
    return this.atividadeUtil.formatarData(data);
  }

  getArrayPaginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }
}
