import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAtividadeComponent } from './nova-atividade.component';

describe('NovaAtividadeComponent', () => {
  let component: NovaAtividadeComponent;
  let fixture: ComponentFixture<NovaAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaAtividadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
