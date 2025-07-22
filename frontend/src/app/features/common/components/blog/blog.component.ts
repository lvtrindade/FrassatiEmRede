<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtividadesService } from '../../../../core/services/atividades.service';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  // Propriedades para tags e atividades
  tags: { id: number, nome: string }[] = [];
=======
// blog.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { TagsService } from '../../../../core/services/tags.service';
import { AtividadeUtilService } from '../../../../core/utils/atividade-util.service';
import { CardAtividadeComponent } from '../../../../shared/components/cards/card-atividade/card-atividade.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, CommonModule, CardAtividadeComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  tags: { id: number; nome: string }[] = [];
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  tagSelecionada: number | null = null;
  atividades: any[] = [];
  atividadesFiltradas: any[] = [];

<<<<<<< HEAD
  // Propriedades para paginação
  atividadesPorPagina: number = 20; // Número de atividades por página
  paginaAtual: number = 1; // Página atual
  totalPaginas: number = 1; // Total de páginas

  constructor(private http: HttpClient, private atividadesService: AtividadesService) { }
=======
  atividadesPorPagina: number = 20;
  paginaAtual: number = 1;
  totalPaginas: number = 1;

  constructor(
    private tagService: TagsService,
    private atividadesService: AtividadesService,
    private atividadeUtil: AtividadeUtilService
  ) {}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

  ngOnInit() {
    this.carregarTags();
    this.loadAtividades();
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        } else {
          this.atividades = [];
          this.atividadesFiltradas = [];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar atividades:', err);
<<<<<<< HEAD
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
=======
      },
    });
  }

  filtrarAtividades(): void {
    const termo = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;

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

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  getAtividadesPaginaAtual(): any[] {
    const inicio = (this.paginaAtual - 1) * this.atividadesPorPagina;
    const fim = inicio + this.atividadesPorPagina;
    return this.atividadesFiltradas.slice(inicio, fim);
  }

<<<<<<< HEAD
  // Método para ir para a próxima página
=======
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

<<<<<<< HEAD
  // Método para voltar para a página anterior
=======
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

<<<<<<< HEAD
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
=======
  formatarData(data: string): string {
    return this.atividadeUtil.formatarData(data);
  }

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  getArrayPaginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }
}