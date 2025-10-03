import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventoComponent } from './modal-evento.component';

describe('ModalEventoComponent', () => {
  let component: ModalEventoComponent;
  let fixture: ComponentFixture<ModalEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
