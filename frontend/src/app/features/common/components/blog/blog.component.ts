import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  showSearchInput = true;
  showFilterSelect = true;

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      if (url.includes('/atividade/')) {
        this.showSearchInput = false;
        this.showFilterSelect = false;
      } else {
        this.showSearchInput = true;
        this.showFilterSelect = true;
      }
    });
  }
}
