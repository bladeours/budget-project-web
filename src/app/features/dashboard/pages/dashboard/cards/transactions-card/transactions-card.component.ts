import {Component, Input} from '@angular/core';
import {TransactionCard} from "../../../../../../shared/models/TransactionCard";
import {TransactionsPage} from "../../../../../../graphql/__generated__";
import {GraphqlService} from "../../../../../../graphql/service/graphql.service";
import {TransactionService} from "../../../../../transactions/service/transaction.service";
@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss']
})
export class TransactionsCardComponent {
  transactionCards: TransactionCard[] = [];


  constructor(private graphqlService: GraphqlService, private transactionService: TransactionService) {
  }

  ngAfterViewInit() {
    this.setTransactions();
  }

  setTransactions() {
    this.graphqlService.getTransactionsPage({number: 0, size: 10}, {}).subscribe(
      value => {
        let transactionPage: TransactionsPage = value.data.getTransactionsPage as TransactionsPage;
        this.transactionCards = this.transactionService.getTransactionCards(transactionPage);
        console.log(this.transactionCards);
      }
    )
  }

  handleTransactionClick(hash: string) {
    alert(hash);
  }
}
