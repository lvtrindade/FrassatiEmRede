import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmailService } from '../../../../core/services/email.service';
import { AlertaMensagemComponent } from '../../../../shared/components/alerta-mensagem/alerta-mensagem.component';

@Component({
  selector: 'app-fale-conosco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertaMensagemComponent],
  templateUrl: './fale-conosco.component.html',
  styleUrl: './fale-conosco.component.css',
})
export class FaleConoscoComponent implements OnInit {
  emailForm: FormGroup;
  loading = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' | 'aviso' | '' = '';

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      telephone: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)],
      ],
      section: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.emailForm.get('telephone')?.valueChanges.subscribe((value: string) => {
      this.formatarTelefone(value);
    });
  }

  formatarTelefone(value: string) {
    if (typeof value !== 'string') return;

    let digits = value.replace(/\D/g, '');

    // Limita a 11 dígitos (ex: 11999998888)
    if (digits.length > 11) digits = digits.slice(0, 11);

    let formatted = '';

    if (digits.length === 0) {
      formatted = '';
    } else if (digits.length <= 2) {
      formatted = `(${digits}`;
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(
        6
      )}`;
    } else {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
        7
      )}`;
    }

    if (value.length < formatted.length && digits.length === 0) {
      formatted = '';
    }

    this.emailForm.get('telephone')?.setValue(formatted, { emitEvent: false });
  }

  get email() {
    return this.emailForm.get('email');
  }

  onSubmit() {
    if (!this.emailForm.valid) return;

    this.loading = true;
    this.mensagem = '';
    this.tipoMensagem = '';

    this.emailService.sendEmail(this.emailForm.value).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response?.cod === 200) {
          this.mensagem = 'E-mail enviado com sucesso!';
          this.tipoMensagem = 'sucesso';
          this.emailForm.reset();
        } else {
          this.mensagem = 'Erro ao enviar o e-mail: ' + response.mensagem;
          this.tipoMensagem = 'erro';
        }
      },
      error: (error) => {
        this.loading = false;
        this.mensagem = 'Erro ao enviar o e-mail.';
        this.tipoMensagem = 'erro';
        console.error(error);
      },
    });
  }
}
