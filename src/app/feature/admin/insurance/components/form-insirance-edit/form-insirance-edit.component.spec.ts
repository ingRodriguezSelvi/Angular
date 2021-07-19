import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInsiranceEditComponent } from './form-insirance-edit.component';

describe('FormInsiranceEditComponent', () => {
  let component: FormInsiranceEditComponent;
  let fixture: ComponentFixture<FormInsiranceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInsiranceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInsiranceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
