import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
=======
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
<<<<<<< HEAD
  imports: [RouterOutlet],
=======
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  constructor (private authService: AuthService, private router: Router) {}

  logout () {
    this.authService.logout();
  }

  navigateTo(path: string) {
    this.router.navigate([`/admin/dashboard/${path}`]);
  }
}