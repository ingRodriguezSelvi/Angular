import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSpecialtiesEditComponent } from './form-specialties-edit.component';

describe('FormSpecialtiesEditComponent', () => {
  let component: FormSpecialtiesEditComponent;
  let fixture: ComponentFixture<FormSpecialtiesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSpecialtiesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSpecialtiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
