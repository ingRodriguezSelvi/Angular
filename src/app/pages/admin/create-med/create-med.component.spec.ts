import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedComponent } from './create-med.component';

describe('CreateMedComponent', () => {
  let component: CreateMedComponent;
  let fixture: ComponentFixture<CreateMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
