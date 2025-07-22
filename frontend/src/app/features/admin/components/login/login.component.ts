import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
=======
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
=======
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
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

<<<<<<< HEAD
    const dadosLogin = {
      username: this.loginForm.value.usuario,
      password: this.loginForm.value.senha
    };
    
    const headers = { 'Content-Type': 'application/json' };

    this.http.post<{ message: string }>('http://localhost/src/app/backend/login.php', dadosLogin, { headers })
      .subscribe(
        (response: any) => {
          console.log('Resposta completa do servidor:', response);
          console.log('Resposta do servidor:', response);

          if (response.message === 'Login bem-sucedido!') {
            
            localStorage.setItem('authToken', 'true');
            
            this.router.navigate(['/admin/dashboard/background']);

          } else {
            alert('Usuário ou senha inválidos!');  
          }

        },
        
        (error) => {
          console.error('Erro na requisição:', error);
          alert('Erro ao tentar fazer login. Tente novamente.');
        }

      );
=======
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
      },
      complete: () => {
        this.loading = false;
      },
    });
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
  }
}
