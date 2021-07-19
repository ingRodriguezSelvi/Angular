import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsersEditComponent } from './form-users-edit.component';

describe('FormUsersEditComponent', () => {
  let component: FormUsersEditComponent;
  let fixture: ComponentFixture<FormUsersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUsersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
