import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  inputLogin: HTMLElement | undefined;
  inputPassword: HTMLElement | undefined;
  onFocus(container: HTMLElement) {
    container.classList.add('focused');
  }

  onBlur(container: HTMLElement) {
    container.classList.remove('focused');
  }

  usuario: string = '';
  senha: string = '';

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {}

  fazerLogin () {

    const dados = { usuario: this.usuario, senha: this.senha};

    this.http.post<{ sucess:boolean }>('http://localhost/site/src/app/backend/login.php', dados).subscribe (
      (res) => {

        console.log('Resposta do servidor:', res);

        if (res.sucess) {

          console.log('Login bem-sucedido! Redirecionando...');

          this.ngZone.run(() => {
            this.router.navigate(['/admin/dashboard']);
          });
        
        } else {
        
          alert('Login ou Senha incorretos!');
        
        }
      },
      (erro) => {
        console.error('Erro na requisição', erro);
        alert('Erro ao tentar fazer Login');
      }
    );
  }
}
