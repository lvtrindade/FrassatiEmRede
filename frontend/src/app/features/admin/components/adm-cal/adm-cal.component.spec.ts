import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCalComponent } from './adm-cal.component';

describe('AdmCalComponent', () => {
  let component: AdmCalComponent;
  let fixture: ComponentFixture<AdmCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
