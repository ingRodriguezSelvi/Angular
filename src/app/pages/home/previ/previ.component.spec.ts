import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviComponent } from './previ.component';

describe('PreviComponent', () => {
  let component: PreviComponent;
  let fixture: ComponentFixture<PreviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
