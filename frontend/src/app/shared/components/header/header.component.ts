import { DOCUMENT, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header', { static: true }) header!: ElementRef;

  isOpen = false;
  menuAberto = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    const headerElement = this.document.querySelector('.header') as HTMLElement;
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  optionSelected(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event): void {
    const target = event.target as HTMLElement;
    const isDropdown = target.closest('.dropdown');
    if (!isDropdown) {
      this.isOpen = false;
    }
  }

  isGroupActive(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.startsWith('/grupo/');
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  closeMenu(): void {
    this.menuAberto = false;
  }
}
