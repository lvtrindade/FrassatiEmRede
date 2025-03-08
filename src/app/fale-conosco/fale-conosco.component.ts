import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-fale-conosco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fale-conosco.component.html',
  styleUrl: './fale-conosco.component.css'
})
export class FaleConoscoComponent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      telephone: ['', Validators.required],
      section: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  onSubmit() {
    if (this.emailForm.valid) {
      console.log("Email válido:", this.emailForm.value);
      this.emailService.sendEmail(this.emailForm.value).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            console.log('E-mail enviado com sucesso:', response);
            alert('E-mail enviado com sucesso!');
            this.emailForm.reset();
          } else {
            console.error('Erro ao enviar o E-mail:', response.message);
            alert('Erro ao enviar o e-mail: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Erro ao enviar o E-mail:', error);
          alert('Erro ao enviar o e-mail.');
        }
      });
    } else {
      console.log("Email inválido");
    }
  }
}