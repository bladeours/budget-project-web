import {Component, Input} from '@angular/core';
import {TransactionCard} from "../../TransactionCard";
@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss']
})
export class TransactionsCardComponent {
  // transactionCard: TransactionCard = new TransactionCard();
  transactionCards: TransactionCard[] = [];

  ngAfterViewInit() {
    this.transactionCards = this.getLatestTransactions();
  }

  getLatestTransactions() {
    let transactionCard: TransactionCard = new TransactionCard();
    transactionCard.icon = "money_off";
    transactionCard.category = "Public Transport";
    transactionCard.account = "Santander";
    transactionCard.amount = 21.53;
    return [transactionCard, transactionCard, transactionCard]
  }
}
