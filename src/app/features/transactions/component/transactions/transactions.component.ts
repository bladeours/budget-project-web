import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

import {
  Category,
  DateOperator,
  Filter,
  LogicOperator,
  NumberOperator,
  StringExpression,
  StringOperator,
  TransactionsPage,
} from 'src/app/graphql/__generated__';
import { GraphqlService } from 'src/app/graphql/service/graphql.service';
import { Utils } from 'src/app/shared/utils/Utils';
import { myGreen, myRed } from '../../../../environments/environment';
import { TransactionCard } from '../../../../shared/models/TransactionCard';
import { TransactionCardService } from '../../service/transaction-card.service';
import { CalendarHeaderComponent } from '../../../../shared/components/calendar/calendar-header/calendar-header.component';
import { DateService } from '../../../../shared/service/date.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @ViewChild('paginator', { read: ElementRef }) paginator: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('filters') filters: ElementRef;
  @ViewChild('transactionWrapper', { read: ElementRef })
  transactionWrapper: ElementRef;
  transactionCards: TransactionCard[] = [];
  categories: FormControl<any> = new FormControl();
  from = new FormControl();
  to = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  length = 100;
  pageSize = 25;
  pageIndex = 0;
  categoryList: Category[] = [];
  categoryFilter: Filter = {};
  amountToFilter: Filter = {};
  amountFromFilter: Filter = {};
  dateFilter: Filter = {};
  filter: Filter = { logicOperator: LogicOperator.And, subFilters: [] };
  protected readonly myGreen = myGreen;
  protected readonly myRed = myRed;

  constructor(
    private graphqlService: GraphqlService,
    private transactionService: TransactionCardService,
    private renderer: Renderer2,
    private dateService: DateService,
  ) {}

  ngOnInit() {
    this.setTransactions();
    setTimeout(() => this.resizeTransactionWrapper(), 2);
    this.setCategories();
    this.categories.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((v) => this.handleChangeCategories(v));
    this.from.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((v) => this.handleChangeFrom(v));
    this.to.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((v) => this.handleChangeTo(v));
    this.range.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((v) => this.handleRangeDate(v));
    this.range.setValue({
      start: this.dateService.getCurrentMonthStart(),
      end: this.dateService.getCurrentMonthEnd(),
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeTransactionWrapper();
  }

  handleRangeDate(v: any) {
    if (this.range.valid) {
      if (v.end == null || v.start == null) {
        this.dateFilter = {};
        this.setSubFiltersAndRefresh();
        return;
      }
      this.dateFilter = {
        logicOperator: LogicOperator.And,
        dateFilters: [
          {
            field: 'date',
            operator: DateOperator.Between,
            values: [
              Utils.getFullDateString(v.start),
              Utils.getFullDateString(v.end),
            ],
          },
        ],
      };

      this.setSubFiltersAndRefresh();
    }
  }

  handleChangeCategories(value: Category[]) {
    if (this.categories.valid) {
      if (value.length == 0) {
        this.categoryFilter = {};
        this.setSubFiltersAndRefresh();
        return;
      }
      let stringExpressions: StringExpression[] = value.map((c) => {
        let e: StringExpression;
        e = {
          value: c.hash,
          operator: StringOperator.Equals,
          field: 'category.hash',
        };
        return e;
      });
      this.categoryFilter = {
        logicOperator: LogicOperator.Or,
        stringFilters: stringExpressions,
      };
      this.setSubFiltersAndRefresh();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setTransactions();
  }

  handleChangeFrom(value: number) {
    if (this.from.valid) {
      if (this.to.value == null) {
        this.amountToFilter = {};
        this.setSubFiltersAndRefresh();
        return;
      }
      this.amountToFilter = {
        doubleFilters: [
          {
            field: 'amount',
            operator: NumberOperator.Gte,
            value: value,
          },
        ],
        logicOperator: LogicOperator.And,
      };
    }
    this.setSubFiltersAndRefresh();
  }

  handleChangeTo(value: number) {
    if (this.to.valid) {
      if (this.to.value == null) {
        this.amountFromFilter = {};
        this.setSubFiltersAndRefresh();
        return;
      }
      this.amountFromFilter = {
        doubleFilters: [
          {
            field: 'amount',
            operator: NumberOperator.Lte,
            value: value,
          },
        ],
        logicOperator: LogicOperator.And,
      };
    }
    this.setSubFiltersAndRefresh();
  }

  private setSubFiltersAndRefresh() {
    this.filter.subFilters = [
      this.categoryFilter,
      this.amountToFilter,
      this.amountFromFilter,
      this.dateFilter,
    ];
    this.setTransactions();
  }

  private setTransactions() {
    this.graphqlService
      .getTransactionsPage(
        { number: this.pageIndex, size: this.pageSize },
        this.filter,
      )
      .subscribe((value) => {
        let transactionPage: TransactionsPage = value.data
          .getTransactionsPage as TransactionsPage;
          // console.log(transactionPage.content.category?.color)
        this.transactionCards =
          this.transactionService.getTransactionCards(transactionPage);
        this.length = transactionPage.totalElements as number;
      });
  }

  private resizeTransactionWrapper() {
    if (window.innerWidth > 800) {
      let paginatorHeight = this.paginator.nativeElement.offsetHeight;
      let wrapperHeight = this.wrapper.nativeElement.offsetHeight;
      let filtersHeight = this.filters.nativeElement.offsetHeight;
      this.renderer.setStyle(
        this.transactionWrapper.nativeElement,
        'max-height',
        wrapperHeight - paginatorHeight - filtersHeight - 30 + 'px',
      );
    }
  }

  private setCategories() {
    this.graphqlService.getCategories().subscribe({
      next: (v) => {
        this.categoryList = (v.data.getCategories as Category[])
          .slice()
          .sort((c1, c2) => (c1.income ? 1 : -1));
      },
    });
  }

  protected readonly CalendarHeaderComponent = CalendarHeaderComponent;
}
