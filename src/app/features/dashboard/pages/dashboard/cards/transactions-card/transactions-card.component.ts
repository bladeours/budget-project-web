import { Component, Input } from '@angular/core';
import { TransactionCard } from '../../../../../../shared/models/TransactionCard';
import {
  LogicOperator,
  TransactionsPage,
  TransactionType,
} from '../../../../../../graphql/__generated__';
import { GraphqlService } from '../../../../../../graphql/service/graphql.service';
import { TransactionCardService } from '../../../../../transactions/service/transaction-card.service';

@Component({
  selector: 'app-transactions-card',
  templateUrl: './transactions-card.component.html',
  styleUrls: ['./transactions-card.component.scss'],
})
export class TransactionsCardComponent {
  transactionCards: TransactionCard[] = [];
  @Input()
  income: Boolean = false;
  title: string = 'Latest Expenses';

  constructor(
    private graphqlService: GraphqlService,
    private transactionService: TransactionCardService,
  ) {}

  ngAfterViewInit() {
    this.setTransactions();
  }

  setTransactions() {
    let type: TransactionType;
    if (this.income) {
      this.title = 'Latest Incomes';
      type = TransactionType.Income;
    } else {
      type = TransactionType.Expense;
    }
    this.graphqlService
      .getTransactionsPage(
        { number: 0, size: 10 },
        {
          logicOperator: LogicOperator.And,
          transactionTypeFilters: [
            {
              value: type,
              field: 'transactionType',
            },
          ],
        },
      )
      .subscribe((value) => {
        let transactionPage: TransactionsPage = value.data
          .getTransactionsPage as TransactionsPage;
        this.transactionCards =
          this.transactionService.getTransactionCards(transactionPage);
        if (this.income) {
          this.transactionCards = this.transactionCards.filter(
            (t) => t.type == TransactionType.Income,
          );
        }
      });
  }
}
