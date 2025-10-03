import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaMensagemComponent } from './alerta-mensagem.component';

describe('AlertaMensagemComponent', () => {
  let component: AlertaMensagemComponent;
  let fixture: ComponentFixture<AlertaMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaMensagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
