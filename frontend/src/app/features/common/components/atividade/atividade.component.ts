import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../../../models/atividade.model';
import { ActivatedRoute } from '@angular/router';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css'],
  imports: [CommonModule]
})
export class AtividadeComponent implements OnInit {
  atividadeId!: number;
  atividade?: Atividade;

  constructor(
    private route: ActivatedRoute,
    private atividadeService: AtividadesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.atividadeId = +id;
        this.buscarAtividade(this.atividadeId);
      }
    });
  }

  buscarAtividade(id: number): void {
    this.atividadeService.buscarPorId(id).subscribe({
      next: (res) => {
        this.atividade = res.data;
      },
      error: (err) => console.error('Erro ao carregar atividade:', err),
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
