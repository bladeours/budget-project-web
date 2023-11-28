import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
} from '../../../../graphql/__generated__';
import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { TransactionCard } from '../../../../shared/models/TransactionCard';
import { TransactionCardService } from '../../service/transaction-card.service';
import { MatDialog } from '@angular/material/dialog';
import { myGreen, myRed } from '../../../../environments/environment';
import { Utils } from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  @ViewChild('paginator', { read: ElementRef }) paginator: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('filters') filters: ElementRef;
  @ViewChild('transactionWrapper') transactionWrapper: ElementRef;
  transactionCards: TransactionCard[] = [];
  categories: FormControl<any> = new FormControl();
  from = new FormControl();
  to = new FormControl();
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];
  protected readonly myGreen = myGreen;
  protected readonly myRed = myRed;
  categoryList: Category[] = [];
  categoryFilter: Filter = {};
  amountToFilter: Filter = {};
  amountFromFilter: Filter = {};
  dateFilter: Filter = {};
  filter: Filter = { logicOperator: LogicOperator.And, subFilters: [] };

  constructor(
    private graphqlService: GraphqlService,
    private transactionService: TransactionCardService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.setTransactions();
    this.resizeTransactionWrapper();
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
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeTransactionWrapper();
  }

  private resizeTransactionWrapper() {
    if (window.innerWidth > 800) {
      let paginatorHeight = this.paginator.nativeElement.offsetHeight;
      let wrapperHeight = this.wrapper.nativeElement.offsetHeight;
      let filtersHeight = this.filters.nativeElement.offsetHeight;
      this.renderer.setStyle(
        this.transactionWrapper.nativeElement,
        'max-height',
        wrapperHeight - paginatorHeight - filtersHeight - 30 + 'px'
      );
    }
  }

  handleRangeDate(v: any) {
    if (this.range.valid) {
      if(v.end == null || v.start == null){
        this.dateFilter = {};
        this.setSubFiltersAndRefresh();
        return;
      }
      this.dateFilter = {
        logicOperator : LogicOperator.And,
        dateFilters: [
          {
            field: 'date',
            operator: DateOperator.Between,
            values: [Utils.getFullDateString(v.start), Utils.getFullDateString(v.end)],
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

  setSubFiltersAndRefresh() {
    this.filter.subFilters = [
      this.categoryFilter,
      this.amountToFilter,
      this.amountFromFilter,
      this.dateFilter,
    ];
    this.setTransactions();
  }

  setTransactions() {
    this.graphqlService
      .getTransactionsPage(
        { number: this.pageIndex, size: this.pageSize },
        this.filter
      )
      .subscribe((value) => {
        let transactionPage: TransactionsPage = value.data
          .getTransactionsPage as TransactionsPage;
        this.transactionCards =
          this.transactionService.getTransactionCards(transactionPage);
        this.length = transactionPage.totalElements as number;
      });
  }

  private handleChangeTo(value: number) {
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

  private handleChangeFrom(value: number) {
    console.log(this.from.validator);
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

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setTransactions();
  }

  private setCategories() {
    this.graphqlService.getCategories().subscribe({
      next: (v) => {
        this.categoryList = (v.data.getCategories as Category[])
          .filter((c) => c.parent === null)
          .sort((c1, c2) => (c1.income ? 1 : -1));
      },
    });
  }
}
