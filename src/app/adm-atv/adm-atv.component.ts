import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-atv',
  imports: [],
  templateUrl: './adm-atv.component.html',
  styleUrl: './adm-atv.component.css'
})
export class AdmAtvComponent {
    constructor (private router: Router) {}

    navigateTo(path: string) {
      this.router.navigate([`/admin/dashboard/${path}`]);
    }
}
