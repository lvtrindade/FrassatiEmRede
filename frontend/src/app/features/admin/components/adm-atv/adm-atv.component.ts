import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { TagsService } from '../../../../core/services/tags.service';
import { AtividadeUtilService } from '../../../../core/utils/atividade-util.service';
import { CardAtividadeComponent } from '../../../../shared/components/cards/card-atividade/card-atividade.component';
import { ModalEdicaoComponent } from '../../../../core/modals/modal-edicao/modal-edicao.component';

@Component({
  selector: 'app-adm-atv',
  imports: [
    FormsModule,
    CommonModule,
    CardAtividadeComponent,
    ModalEdicaoComponent,
  ],
  templateUrl: './adm-atv.component.html',
  styleUrl: './adm-atv.component.css',
})
export class AdmAtvComponent implements OnDestroy {
  tags: { id: number; nome: string }[] = [];
  tagSelecionada: number | null = null;
  atividades: any[] = [];
  atividadesFiltradas: any[] = [];
  menuAberto: number | null = null;
  atividadeEditando: any = null;
  imagens_galeria: { file: File; url: string }[] = [];
  imagem_principal: File | null = null;
  imagensExistenteGaleria: any[] = [];
  imagensRemovidasGaleria: number[] = [];

  // Propriedades para paginação
  atividadesPorPagina: number = 20;
  paginaAtual: number = 1;
  totalPaginas: number = 1;

  constructor(
    private tagService: TagsService,
    private atividadesService: AtividadesService,
    private atividadeUtil: AtividadeUtilService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  navigateTo(path: string) {
    this.router.navigate([`/admin/dashboard/${path}`]);
  }

  ngOnInit() {
    this.carregarTags();
    this.loadAtividades();
  }

  ngOnDestroy() {
    // Limpeza de todas as URLs blob
    this.imagens_galeria.forEach((img) => URL.revokeObjectURL(img.url));
  }

  carregarTags() {
    this.tagService.getTags().subscribe({
      next: (res) => {
        this.tags = res.data;
        console.log('Tags carregadas: ', this.tags);
      },
      error: (err) => {
        console.error('Erro ao carregar tags: ', err);
      },
    });
  }

  private loadAtividades(): void {
    this.atividadesService.getAtividades().subscribe({
      next: (response: any) => {
        if (response && response.data && response.data.length > 0) {
          this.atividades = response.data;
          this.atividadesFiltradas = this.atividades;
          this.calcularTotalPaginas();
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

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(
      this.atividadesFiltradas.length / this.atividadesPorPagina
    );
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

  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  formatarData(data: string): string {
    return this.atividadeUtil.formatarData(data);
  }

  toggleMenu(atividadeId: number, event: Event): void {
    event.stopPropagation();
    if (this.menuAberto === atividadeId) {
      this.menuAberto = null;
    } else {
      this.menuAberto = atividadeId;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event): void {
    const target = event.target as HTMLElement;
    const isDropdown = target.closest('.opcoes');
    if (!isDropdown) {
      this.menuAberto = null;
    }
  }

  excluirAtividade(atividadeId: number): void {
    if (confirm('Tem certeza que deseja excluir esta atividade?')) {
      this.atividadesService.excluirAtividade(atividadeId).subscribe({
        next: (response: any) => {
          if (response && response.cod === 200) {
            this.loadAtividades();
          } else {
            console.error(
              'Erro ao excluir atividade:',
              response.mensagem || 'Erro desconhecido'
            );
          }
        },
        error: (err) => {
          console.error('Erro ao excluir atividade:', err);
          alert('Erro ao excluir atividade.');
        },
      });
    }
  }

  getArrayPaginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  editarAtividade(atividadeId: number): void {
    const atividade = this.atividades.find((a) => a.id === atividadeId);
    if (atividade) {
      this.atividadeEditando = { ...atividade };

      // Inicializa as listas de imagens
      this.imagensExistenteGaleria = atividade.galeria
        ? [...atividade.galeria]
        : [];
      this.imagensRemovidasGaleria = [];
      this.imagens_galeria = [];
      this.imagem_principal = null;
    }
  }

  removerImagemExistente(index: number): void {
    // Adiciona o ID da imagem à lista de removidas (se tiver ID)
    if (this.imagensExistenteGaleria[index].id) {
      this.imagensRemovidasGaleria.push(this.imagensExistenteGaleria[index].id);
    }
    // Remove da lista de exibição
    this.imagensExistenteGaleria.splice(index, 1);
    this.cdRef.detectChanges();
  }

  fecharModal(): void {
    this.atividadeEditando = null;
    this.imagens_galeria.forEach((img) => URL.revokeObjectURL(img.url));
    this.imagens_galeria = [];
    this.imagem_principal = null;
  }

  onImagemPrincipalSelecionada(event: any): void {
    const file: File = event.target.files[0];
    this.imagem_principal = file;
    this.cdRef.detectChanges();
  }

  onGaleriaSelecionada(event: any): void {
    const files: FileList = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      newImages.push({
        file: files[i],
        url: URL.createObjectURL(files[i]),
      });
    }

    this.imagens_galeria = [...this.imagens_galeria, ...newImages];
    this.cdRef.detectChanges();
  }

  removerImagemGaleria(index: number): void {
    this.atividadeEditando.galeria.splice(index, 1);
    this.cdRef.detectChanges();
  }

  removerNovaImagemGaleria(index: number): void {
    URL.revokeObjectURL(this.imagens_galeria[index].url);
    this.imagens_galeria.splice(index, 1);
    this.cdRef.detectChanges();
  }

  salvarEdicao(): void {
    if (!this.atividadeEditando) return;

    const formData = this.atividadeUtil.gerarFormDataParaEdicao(
      this.atividadeEditando,
      this.imagem_principal,
      this.imagens_galeria,
      this.imagensRemovidasGaleria
    );

    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    this.atividadesService
      .editarAtividade(this.atividadeEditando.id, formData)
      .subscribe({
        next: (response: any) => {
          if (response?.cod == 200) {
            this.loadAtividades();
            this.fecharModal();
          } else {
            alert(
              'Erro ao salvar edição: ' +
                (response?.mensagem || 'Erro desconhecido')
            );
          }
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          alert('Erro ao salvar edição.');
        },
      });
  }
}
