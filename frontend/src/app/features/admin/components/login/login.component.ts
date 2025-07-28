import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  erroLogin = '';

  usuarioFocused = false;
  senhaFocused = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.erroLogin = '';

    const { usuario, senha } = this.loginForm.value;

    this.authService.login(usuario, senha).subscribe({
      next: (res) => {
        if (res?.cod === 200 && res?.data?.token) {
          this.authService.setToken(res.data.token);
          this.authService.setUser(res.data.usuario);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.erroLogin = 'Usuário ou senha inválidos!';
        }
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.erroLogin = 'Erro ao tentar fazer login. Tente novamente.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
