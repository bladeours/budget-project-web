import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../../../shared/models/Transaction";
@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss']
})
export class TransactionsCardComponent {
  transactionCards: Transaction[] = [];

  ngAfterViewInit() {
    this.transactionCards = this.getLatestTransactions();
  }

  getLatestTransactions() {
    let transactionCard: Transaction = new Transaction();
    transactionCard.icon = "money_off";
    transactionCard.category = "Public Transport";
    transactionCard.account = "Santander";
    transactionCard.amount = 21.53;
    transactionCard.date = "2023-01-20"
    return [transactionCard, transactionCard, transactionCard]
  }
}
