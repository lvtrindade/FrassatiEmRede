import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundService } from '../../../../core/services/background.service';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements AfterViewInit {
  atividades: any[] = [];

  constructor(private BackgroundService: BackgroundService, private atividadesService: AtividadesService) { }
=======
import { CardAtividadeComponent } from '../../../../shared/components/cards/card-atividade/card-atividade.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CommonModule, CardAtividadeComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements AfterViewInit {
  atividades: any[] = [];

  constructor(
    private backgroundService: BackgroundService,
    private atividadesService: AtividadesService
  ) {}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

  ngAfterViewInit(): void {
    this.loadBackgroundImage();
    this.setupScrollLinks();
    this.loadAtividades();
  }

  private loadBackgroundImage(): void {
<<<<<<< HEAD
    this.BackgroundService.getBackgroundImage().subscribe({
      next: (response: { imagem: any; }) => {
=======
    this.backgroundService.getBackgroundImage().subscribe({
      next: (response: { imagem: string | null }) => {
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
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
<<<<<<< HEAD
        // Exiba uma mensagem de erro para o usuário ou use uma imagem de fallback
      }
=======
      },
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    });
  }

  private setupScrollLinks(): void {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
<<<<<<< HEAD

        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;

=======
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        const targetElement = targetId
          ? document.querySelector(targetId)
          : null;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        if (targetElement) {
          const startPosition = window.pageYOffset;
          const targetPosition =
            targetElement.getBoundingClientRect().top + startPosition;
          const distance = targetPosition - startPosition;
          const duration = 1500;
          let startTime: number | null = null;
<<<<<<< HEAD

          const animationScroll = (currentTime: number) => {
            if (!startTime) startTime = currentTime;

=======
          const animationScroll = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(
              timeElapsed,
              startPosition,
              distance,
              duration
            );
<<<<<<< HEAD

            window.scrollTo(0, run);

=======
            window.scrollTo(0, run);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
            if (timeElapsed < duration) {
              requestAnimationFrame(animationScroll);
            }
          };
<<<<<<< HEAD

=======
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
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
<<<<<<< HEAD
        console.log('Dados recebidos:', response); // Log para depuração
        if (response && response.atividades && response.atividades.length > 0) {
          this.atividades = response.atividades.slice(0, 3);
          console.log('Atividades carregadas:', this.atividades); // Log para depuração
          console.log('Imagem da primeira atividade:', this.atividades[0].caminho_imagem_destaque); // Log para depuração
=======
        if (response && response.data && response.data.length > 0) {
          this.atividades = response.data.slice(0, 3);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        } else {
          this.atividades = [];
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar atividades', error);
        this.atividades = [];
<<<<<<< HEAD
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
=======
      },
    });
  }
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
}
