import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
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