import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsiranceComponent } from './list-insirance.component';

describe('ListInsiranceComponent', () => {
  let component: ListInsiranceComponent;
  let fixture: ComponentFixture<ListInsiranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInsiranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsiranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
