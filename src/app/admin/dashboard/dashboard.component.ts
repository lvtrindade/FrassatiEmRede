import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{
  constructor (private router: Router) {}

  ngOnInit(): void {
      const authToken = localStorage.getItem('authToken');
      const expira = localStorage.getItem('expira');

      if (!authToken || !expira || Number(expira) < Date.now() / 1000) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('expira');
          this.router.navigate(['/admin/login']);
      }
  }
}