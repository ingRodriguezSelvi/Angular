import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPatientEditComponent } from './form-patient-edit.component';

describe('FormPatientEditComponent', () => {
  let component: FormPatientEditComponent;
  let fixture: ComponentFixture<FormPatientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPatientEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
