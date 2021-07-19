import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAreaEditComponent } from './form-area-edit.component';

describe('FormAreaEditComponent', () => {
  let component: FormAreaEditComponent;
  let fixture: ComponentFixture<FormAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAreaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
