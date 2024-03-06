import { Component } from '@angular/core';
import { CashSettlement } from '../cash-settlement';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cash-settlement',
  templateUrl: './cash-settlement.component.html',
  styleUrls: ['./cash-settlement.component.css']
})
export class CashSettlementComponent {
  cashSettlement = new CashSettlement('', 0);

  constructor(private http: HttpClient) {}

  submit() {
    this.http.post<any>('http://localhost:3000/api/cashSettlement', this.cashSettlement)
      .subscribe(
        response => {
          console.log('Cash settlement submitted successfully:', response);
        },
        error => {
          console.error('Error submitting cash settlement:', error);
        }
      );
  }
}
