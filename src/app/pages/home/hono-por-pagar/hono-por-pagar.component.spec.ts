import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoPorPagarComponent } from './hono-por-pagar.component';

describe('HonoPorPagarComponent', () => {
  let component: HonoPorPagarComponent;
  let fixture: ComponentFixture<HonoPorPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonoPorPagarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoPorPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
