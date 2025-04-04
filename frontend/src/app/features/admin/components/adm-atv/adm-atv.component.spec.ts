import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAtvComponent } from './adm-atv.component';

describe('AdmAtvComponent', () => {
  let component: AdmAtvComponent;
  let fixture: ComponentFixture<AdmAtvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmAtvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmAtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
