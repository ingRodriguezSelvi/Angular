import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDoctorsEditComponent } from './form-doctors-edit.component';

describe('FormDoctorsEditComponent', () => {
  let component: FormDoctorsEditComponent;
  let fixture: ComponentFixture<FormDoctorsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDoctorsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDoctorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
