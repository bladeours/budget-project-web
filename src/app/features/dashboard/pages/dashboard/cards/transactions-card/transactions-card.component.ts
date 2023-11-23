import {Component, Input} from '@angular/core';
import {TransactionCard} from "../../../../../../shared/models/TransactionCard";
@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss']
})
export class TransactionsCardComponent {
  transactionCards: TransactionCard[] = [];

  ngAfterViewInit() {
    this.transactionCards = this.getLatestTransactions();
  }

  getLatestTransactions() {
    let transactionCard: TransactionCard = new TransactionCard();
    transactionCard.icon = "money_off";
    transactionCard.category = "Public Transport";
    transactionCard.account = "Santander";
    transactionCard.amount.amount = 21.53;
    transactionCard.amount.color = "#ffffff";
    transactionCard.date = "2023-01-20"
    return [transactionCard, transactionCard, transactionCard]
  }
}
