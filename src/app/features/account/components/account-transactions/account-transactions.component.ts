import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TransactionCard } from '../../../../shared/models/TransactionCard';
import {
  LogicOperator,
  StringOperator,
  TransactionsPage,
} from '../../../../graphql/__generated__';
import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { TransactionCardService } from '../../../transactions/service/transaction-card.service';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrl: './account-transactions.component.scss',
})
export class AccountTransactionsComponent implements OnInit {
  @Input()
  hash: string;
  @ViewChild('paginator', { read: ElementRef }) paginator: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('transactionWrapper') transactionWrapper: ElementRef;

  transactionCards: TransactionCard[] = [];
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];

  constructor(
    private renderer: Renderer2,
    private graphqlService: GraphqlService,
    private transactionService: TransactionCardService,
  ) {}

  ngOnInit() {
    this.setTransactions();
    this.resizeTransactionWrapper();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setTransactions();
  }

  private resizeTransactionWrapper() {
    if (window.innerWidth > 800) {
      let paginatorHeight = this.paginator.nativeElement.offsetHeight;
      let wrapperHeight = this.wrapper.nativeElement.offsetHeight;
      this.renderer.setStyle(
        this.transactionWrapper.nativeElement,
        'max-height',
        wrapperHeight - paginatorHeight - 30 + 'px',
      );
    }
  }

  private setTransactions() {
    this.graphqlService
      .getTransactionsPage(
        { number: this.pageIndex, size: this.pageSize },
        {
          logicOperator: LogicOperator.Or,
          stringFilters: [
            {
              value: this.hash,
              operator: StringOperator.Equals,
              field: 'accountTo.hash',
            },
            {
              value: this.hash,
              operator: StringOperator.Equals,
              field: 'accountFrom.hash',
            },
          ],
        },
      )
      .subscribe((value) => {
        let transactionPage: TransactionsPage = value.data
          .getTransactionsPage as TransactionsPage;
        this.transactionCards =
          this.transactionService.getTransactionCards(transactionPage);
        this.length = transactionPage.totalElements as number;
      });
  }
}
