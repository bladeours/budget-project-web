import {Component, Input} from '@angular/core';
import {TransactionCard} from "../../../TransactionCard";

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {
  @Input()
  transactionCard: TransactionCard;
}
