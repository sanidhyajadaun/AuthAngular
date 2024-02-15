import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSettlementComponent } from './cash-settlement.component';

describe('CashSettlementComponent', () => {
  let component: CashSettlementComponent;
  let fixture: ComponentFixture<CashSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashSettlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
