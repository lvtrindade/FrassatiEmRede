import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AtividadesService } from '../atividades.service';

@Component({
  selector: 'app-adm-atv',
  imports: [FormsModule, CommonModule],
  templateUrl: './adm-atv.component.html',
  styleUrl: './adm-atv.component.css'
})

export class AdmAtvComponent implements OnDestroy {
  tags: { id: number, nome: string }[] = [];
  tagSelecionada: number | null = null;
  atividades: any[] = [];
  atividadesFiltradas: any[] = [];
  menuAberto: number | null = null;
  atividadeEditando: any = null;
  imagensGaleria: {file: File, url: string}[] = []; // Alterado para armazenar file e URL
  imagemPrincipal: File | null = null;
  imagensExistenteGaleria: any[] = [];
  imagensRemovidasGaleria: number[] = [];

  // Propriedades para paginação
  atividadesPorPagina: number = 20;
  paginaAtual: number = 1;
  totalPaginas: number = 1;

  constructor(
    private http: HttpClient, 
    private atividadesService: AtividadesService, 
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  navigateTo(path: string) {
    this.router.navigate([`/admin/dashboard/${path}`]);
  }

  ngOnInit() {
    this.carregarTags();
    this.loadAtividades();
  }

  ngOnDestroy() {
    // Limpeza de todas as URLs blob
    this.imagensGaleria.forEach(img => URL.revokeObjectURL(img.url));
  }

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

  private loadAtividades(): void {
    this.atividadesService.getAtividades().subscribe({
      next: (response: any) => {
        console.log('Atividades carregadas:', response);
        if (response && response.atividades && response.atividades.length > 0) {
          this.atividades = response.atividades;
          this.atividadesFiltradas = this.atividades;
          this.calcularTotalPaginas();
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

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.atividadesFiltradas.length / this.atividadesPorPagina);
  }

  filtrarAtividades(): void {
    let atividadesFiltradas = this.atividades;

    const termo = (document.querySelector('input[type="text"]') as HTMLInputElement).value.toLowerCase();
    if (termo) {
      atividadesFiltradas = atividadesFiltradas.filter(atividade =>
        atividade.titulo.toLowerCase().includes(termo)
      );
    }

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
    this.calcularTotalPaginas();
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
      console.log('Excluindo atividade com ID:', atividadeId);
      this.atividadesService.excluirAtividade(atividadeId).subscribe({
        next: (response: any) => {
          console.log('Resposta do backend:', response);
          if (response && response.success) {
            console.log('Atividade excluída com sucesso. Recarregando atividades...');
            this.loadAtividades();
          } else {
            console.error('Erro ao excluir atividade:', response.error);
          }
        },
        error: (err) => {
          console.error('Erro ao excluir atividade:', err);
        }
      });
    }
  }

  getArrayPaginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  editarAtividade(atividadeId: number): void {
    const atividade = this.atividades.find(a => a.id === atividadeId);
    if (atividade) {
      this.atividadeEditando = { ...atividade };
      
      // Inicializa as listas de imagens
      this.imagensExistenteGaleria = atividade.galeria ? [...atividade.galeria] : [];
      this.imagensRemovidasGaleria = [];
      this.imagensGaleria = [];
      this.imagemPrincipal = null;
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
    this.imagensGaleria.forEach(img => URL.revokeObjectURL(img.url));
    this.imagensGaleria = [];
    this.imagemPrincipal = null;
  }

  onImagemPrincipalSelecionada(event: any): void {
    const file: File = event.target.files[0];
    this.imagemPrincipal = file;
    this.cdRef.detectChanges();
  }

  onGaleriaSelecionada(event: any): void {
    const files: FileList = event.target.files;
    const newImages = [];
    
    for (let i = 0; i < files.length; i++) {
      newImages.push({
        file: files[i],
        url: URL.createObjectURL(files[i])
      });
    }
    
    this.imagensGaleria = [...this.imagensGaleria, ...newImages];
    this.cdRef.detectChanges();
  }

  removerImagemGaleria(index: number): void {
    this.atividadeEditando.galeria.splice(index, 1);
    this.cdRef.detectChanges();
  }

  removerNovaImagemGaleria(index: number): void {
    URL.revokeObjectURL(this.imagensGaleria[index].url);
    this.imagensGaleria.splice(index, 1);
    this.cdRef.detectChanges();
  }

  async salvarEdicao(): Promise<void> {
    if (!this.atividadeEditando) return;
  
    try {
      const formData = new FormData();
      
      // Dados básicos
      formData.append('id', this.atividadeEditando.id.toString());
      formData.append('titulo', this.atividadeEditando.titulo);
      formData.append('descricao', this.atividadeEditando.descricao);
      formData.append('dataAtividade', this.atividadeEditando.data_atividade);
      formData.append('tag_id', this.atividadeEditando.tag_id.toString());
  
      // Imagens removidas
      formData.append('imagensRemovidas', JSON.stringify(this.imagensRemovidasGaleria));
  
      // Imagem principal (se alterada)
      if (this.imagemPrincipal) {
        formData.append('imagemPrincipal', this.imagemPrincipal);
      }
  
      // Novas imagens da galeria
      this.imagensGaleria.forEach((img, index) => {
        formData.append(`imagensGaleria[${index}]`, img.file);
      });
  
      this.atividadesService.editarAtividade(formData).subscribe({
        next: (response: any) => {
          console.log('Resposta completa:', response);
          if (response?.success) {
            this.loadAtividades();
            this.fecharModal();
          } else {
            alert('Erro ao editar: ' + (response?.error || 'Erro desconhecido'));
          }
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          if (err.status === 200) {
            // Tentar parsear manualmente se for um erro de parsing
            try {
              const response = JSON.parse(err.error.text);
              if (response.success) {
                this.loadAtividades();
                this.fecharModal();
              } else {
                alert('Erro ao editar: ' + (response.error || 'Erro desconhecido'));
              }
            } catch (e) {
              alert('Erro ao processar resposta do servidor');
            }
          } else {
            alert('Erro ao conectar com o servidor');
          }
        }
      });
    } catch (error) {
      console.error('Erro ao preparar dados:', error);
      alert('Erro ao preparar os dados para envio');
    }
  }
}