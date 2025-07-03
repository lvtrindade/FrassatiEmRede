import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundService } from '../../../../core/services/background.service';
import { AtividadesService } from '../../../../core/services/atividades.service';
import { CommonModule } from '@angular/common';
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

  ngAfterViewInit(): void {
    this.loadBackgroundImage();
    this.setupScrollLinks();
    this.loadAtividades();
  }

  private loadBackgroundImage(): void {
    this.backgroundService.getBackgroundImage().subscribe({
      next: (response: { imagem: string | null }) => {
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
      },
    });
  }

  private setupScrollLinks(): void {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        const targetElement = targetId
          ? document.querySelector(targetId)
          : null;
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
        if (response && response.data && response.data.length > 0) {
          this.atividades = response.data.slice(0, 3);
        } else {
          this.atividades = [];
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar atividades', error);
        this.atividades = [];
      },
    });
  }
}
