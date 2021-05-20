import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPaymentsComponent } from './details-payments.component';

describe('DetailsPaymentsComponent', () => {
  let component: DetailsPaymentsComponent;
  let fixture: ComponentFixture<DetailsPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
