import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsersAssignPasswordComponent } from './form-users-assign-password.component';

describe('FormUsersAssignPasswordComponent', () => {
  let component: FormUsersAssignPasswordComponent;
  let fixture: ComponentFixture<FormUsersAssignPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUsersAssignPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUsersAssignPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
