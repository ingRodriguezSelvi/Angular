import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInsiranceComponent } from './form-insirance.component';

describe('FormInsiranceComponent', () => {
  let component: FormInsiranceComponent;
  let fixture: ComponentFixture<FormInsiranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInsiranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInsiranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
