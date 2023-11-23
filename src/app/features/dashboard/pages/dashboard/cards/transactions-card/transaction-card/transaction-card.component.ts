import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../../../../shared/models/Transaction";

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {
  @Input()
  transactionCard: Transaction;
}
