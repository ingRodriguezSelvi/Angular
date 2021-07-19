import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssignPasswordModalComponent } from './form-assign-password-modal.component';

describe('FormAssignPasswordModalComponent', () => {
  let component: FormAssignPasswordModalComponent;
  let fixture: ComponentFixture<FormAssignPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAssignPasswordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssignPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
