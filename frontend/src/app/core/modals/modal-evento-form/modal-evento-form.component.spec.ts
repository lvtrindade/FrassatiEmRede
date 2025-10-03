import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventoFormComponent } from './modal-evento-form.component';

describe('ModalEventoFormComponent', () => {
  let component: ModalEventoFormComponent;
  let fixture: ComponentFixture<ModalEventoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEventoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEventoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
