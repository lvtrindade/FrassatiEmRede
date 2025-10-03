import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscotismoComponent } from './escotismo.component';

describe('EscotismoComponent', () => {
  let component: EscotismoComponent;
  let fixture: ComponentFixture<EscotismoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscotismoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscotismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
