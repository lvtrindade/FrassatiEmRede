import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements AfterViewInit {

  constructor(private BackgroundService: BackgroundService) { }

  ngAfterViewInit(): void {
    this.loadBackgroundImage();
    this.setupScrollLinks();
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
}
