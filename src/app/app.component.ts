import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { Router } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'site';

  @ViewChild('main') main!: ElementRef;
  isAdminRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const body = document.querySelector('body');
      if (this.router.url.startsWith('/admin')) {
        body?.classList.add('admin');
      } else {
        body?.classList.remove('admin');
      }
    });
  }
}