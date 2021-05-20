import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosMedComponent } from './cobros-med.component';

describe('CobrosMedComponent', () => {
  let component: CobrosMedComponent;
  let fixture: ComponentFixture<CobrosMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobrosMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrosMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
