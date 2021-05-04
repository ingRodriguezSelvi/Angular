import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoAgrupadosComponent } from './hono-agrupados.component';

describe('HonoAgrupadosComponent', () => {
  let component: HonoAgrupadosComponent;
  let fixture: ComponentFixture<HonoAgrupadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonoAgrupadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoAgrupadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
