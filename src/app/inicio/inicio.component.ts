import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundService } from '../background.service';
import { AtividadesService } from '../atividades.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements AfterViewInit {
  atividades: any[] = [];

  constructor(private BackgroundService: BackgroundService, private atividadesService: AtividadesService) { }

  ngAfterViewInit(): void {
    this.loadBackgroundImage();
    this.setupScrollLinks();
    this.loadAtividades();
  }

  private loadBackgroundImage(): void {
    this.BackgroundService.getBackgroundImage().subscribe({
      next: (response: { imagem: any; }) => {
        if (response.imagem) {
          const heroesPage = document.getElementById('heroes_page');
          if (heroesPage) {
            heroesPage.style.backgroundImage = `url(data:image/*;base64,${response.imagem})`;
          }
        } else {
          console.error('Nenhuma imagem encontrada');
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar imagem de fundo', error);
        // Exiba uma mensagem de erro para o usuário ou use uma imagem de fallback
      }
    });
  }

  private setupScrollLinks(): void {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;

        if (targetElement) {
          const startPosition = window.pageYOffset;
          const targetPosition =
            targetElement.getBoundingClientRect().top + startPosition;
          const distance = targetPosition - startPosition;
          const duration = 1500;
          let startTime: number | null = null;

          const animationScroll = (currentTime: number) => {
            if (!startTime) startTime = currentTime;

            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(
              timeElapsed,
              startPosition,
              distance,
              duration
            );

            window.scrollTo(0, run);

            if (timeElapsed < duration) {
              requestAnimationFrame(animationScroll);
            }
          };

          requestAnimationFrame(animationScroll);
        }
      });
    });
  }

  private easeInOutCubic(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  private loadAtividades(): void {
    this.atividadesService.getAtividades().subscribe({
      next: (response: any) => {
        console.log('Dados recebidos:', response); // Log para depuração
        if (response && response.atividades && response.atividades.length > 0) {
          this.atividades = response.atividades.slice(-3);
          console.log('Atividades carregadas:', this.atividades); // Log para depuração
          console.log('Imagem da primeira atividade:', this.atividades[0].caminho_imagem_destaque); // Log para depuração
        } else {
          this.atividades = [];
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar atividades', error);
        this.atividades = [];
      }
    });
  }

  formatarData(data: string): string {
    if (!data || data === '0000-00-00') {
        return 'Data não disponível'; // Mensagem de fallback
    }

    // Adiciona o fuso horário manualmente (assumindo que a data está no formato 'YYYY-MM-DD HH:mm:ss')
    const dataComFuso = `${data}T00:00:00-03:00`; // Ajuste para o fuso horário de São Paulo

    const date = new Date(dataComFuso);
    if (isNaN(date.getTime())) {
        return 'Data inválida'; // Mensagem de fallback
    }

    return date.toLocaleDateString('pt-BR'); // Formata a data no padrão brasileiro
}
}
