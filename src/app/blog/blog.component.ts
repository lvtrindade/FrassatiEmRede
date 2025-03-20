import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AtividadesService } from '../atividades.service';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  // Propriedades para tags e atividades
  tags: { id: number, nome: string }[] = [];
  tagSelecionada: number | null = null;
  atividades: any[] = [];
  atividadesFiltradas: any[] = [];

  // Propriedades para paginação
  atividadesPorPagina: number = 20; // Número de atividades por página
  paginaAtual: number = 1; // Página atual
  totalPaginas: number = 1; // Total de páginas

  constructor(private http: HttpClient, private atividadesService: AtividadesService) { }

  ngOnInit() {
    this.carregarTags();
    this.loadAtividades();
  }

  // Método para carregar as tags
  carregarTags() {
    this.http.get('http://localhost/src/app/backend/listarTags.php')
      .subscribe({
        next: (res: any) => {
          this.tags = res;
          console.log('Tags carregadas:', this.tags);
        },
        error: (err) => {
          console.error('Erro ao carregar tags:', err);
        }
      });
  }

  // Método para carregar as atividades
  private loadAtividades(): void {
    this.atividadesService.getAtividades().subscribe({
      next: (response: any) => {
        console.log('Atividades carregadas:', response);
        if (response && response.atividades && response.atividades.length > 0) {
          this.atividades = response.atividades;
          this.atividadesFiltradas = this.atividades;
          this.calcularTotalPaginas(); // Calcula o total de páginas
          this.filtrarAtividades(); // Aplica o filtro inicial
        } else {
          this.atividades = [];
          this.atividadesFiltradas = [];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar atividades:', err);
      }
    });
  }

  // Método para calcular o total de páginas
  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.atividadesFiltradas.length / this.atividadesPorPagina);
  }

  // Método para filtrar as atividades por título e tag
  filtrarAtividades(): void {
    let atividadesFiltradas = this.atividades;

    // Filtro por título
    const termo = (document.querySelector('input[type="text"]') as HTMLInputElement).value.toLowerCase();
    if (termo) {
      atividadesFiltradas = atividadesFiltradas.filter(atividade =>
        atividade.titulo.toLowerCase().includes(termo)
      );
    }

    // Filtro por tag
    if (this.tagSelecionada) {
      const tagId = Number(this.tagSelecionada);
      const tagSelecionadaObj = this.tags.find(tag => tag.id === tagId);
      if (tagSelecionadaObj) {
        atividadesFiltradas = atividadesFiltradas.filter(atividade =>
          atividade.tag_nome === tagSelecionadaObj.nome
        );
      }
    }

    this.atividadesFiltradas = atividadesFiltradas;
    this.calcularTotalPaginas(); // Recalcula o total de páginas após o filtro
    this.paginaAtual = 1; // Volta para a primeira página após filtrar
  }

  // Método para obter as atividades da página atual
  getAtividadesPaginaAtual(): any[] {
    const inicio = (this.paginaAtual - 1) * this.atividadesPorPagina;
    const fim = inicio + this.atividadesPorPagina;
    return this.atividadesFiltradas.slice(inicio, fim);
  }

  // Método para ir para a próxima página
  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  // Método para voltar para a página anterior
  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  // Método para ir para uma página específica
  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  // Método para formatar a data
  formatarData(data: string): string {
    if (!data || data === '0000-00-00') {
      return 'Data não disponível';
    }

    const dataComFuso = `${data}T00:00:00-03:00`;
    const date = new Date(dataComFuso);

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    return date.toLocaleDateString('pt-BR');
  }

  // Método para gerar um array de páginas (opcional, para navegação por números)
  getArrayPaginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }
}