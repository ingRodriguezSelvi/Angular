import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponPatientComponent } from './form-respon-patient.component';

describe('FormResponPatientComponent', () => {
  let component: FormResponPatientComponent;
  let fixture: ComponentFixture<FormResponPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResponPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResponPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
