import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importando ReactiveFormsModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup; // Definindo o formulário reativo

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Inicializando o formulário com validadores
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]), // Validador "required" para o campo usuario
      senha: new FormControl('', [Validators.required]) // Validador "required" para o campo senha
    });
  }

  // Função chamada ao submeter o formulário
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const dadosLogin = {
      username: this.loginForm.value.usuario,
      password: this.loginForm.value.senha
    };
    
    const headers = { 'Content-Type': 'application/json' };

    this.http.post<{ message: string }>('http://localhost/src/app/admin/login/login.php', dadosLogin, { headers })
      .subscribe(
        (response: any) => {
          console.log('Resposta do servidor:', response);

          if (response.message === 'Login bem-sucedido!') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            alert('Usuário ou senha inválidos!');
          }
        },
        (error) => {
          console.error('Erro na requisição:', error);
          alert('Erro ao tentar fazer login. Tente novamente.');
        }
      );
  }
}
