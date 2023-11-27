import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime} from "rxjs";
import {
  Category,
  Filter,
  LogicOperator,
  StringExpression,
  StringOperator,
  TransactionsPage
} from "../../../../graphql/__generated__";
import {GraphqlService} from "../../../../graphql/service/graphql.service";
import {TransactionCard} from "../../../../shared/models/TransactionCard";
import {TransactionCardService} from "../../service/transaction-card.service";
import {MatDialog} from "@angular/material/dialog";
import {myGreen, myRed} from "../../../../environments/environment";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  @ViewChild('paginator',  { read: ElementRef }) paginator: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('filters') filters: ElementRef;
  @ViewChild('transactionWrapper') transactionWrapper: ElementRef;
  // paginatorHeight: number;
  transactionCards: TransactionCard[] = [];
  categories:FormControl<any> = new FormControl();
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
  categoryFilter: Filter = {
  };
  filter: Filter = {logicOperator: LogicOperator.And, subFilters: []};


  constructor(private graphqlService: GraphqlService, private transactionService: TransactionCardService,
              private renderer: Renderer2, private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.setTransactions();
    this.resizeTransactionWrapper();
    this.setCategories();
    this.categories.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleChangeCategories(v));
    this.from.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleFrom(v));
    this.to.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleTo(v));
    this.range.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleRange(v));
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeTransactionWrapper();
  }

  private resizeTransactionWrapper() {
    if(window.innerWidth > 800){
      let paginatorHeight = this.paginator.nativeElement.offsetHeight;
      let wrapperHeight = this.wrapper.nativeElement.offsetHeight;
      let filtersHeight = this.filters.nativeElement.offsetHeight;
      this.renderer.setStyle(this.transactionWrapper.nativeElement, "max-height", wrapperHeight - paginatorHeight - filtersHeight - 30 + "px");
    }

  }

  handleRange(v :any) {
    console.log(v.end);
    console.log(v.start);
  }

  handleChangeCategories(value: Category[]) {
    if(value.length == 0){
      this.categoryFilter = {};
      this.setSubFiltersAndRefresh();
      return;
    }
    let stringExpressions: StringExpression[] = value.map(c => {
      let e: StringExpression;
      e = {
        value: c.hash,
        operator: StringOperator.Equals,
        field: "category.hash"
      }
      return e;
    })
    this.categoryFilter = {
      logicOperator: LogicOperator.Or,
      stringFilters: stringExpressions
    };
    this.setSubFiltersAndRefresh();
  }

  setSubFiltersAndRefresh(){
   this.filter.subFilters = [this.categoryFilter];
   this.setTransactions();
  }

  setTransactions() {
    this.graphqlService.getTransactionsPage({number: this.pageIndex, size: this.pageSize}, this.filter).subscribe(
        value => {
          let transactionPage: TransactionsPage = value.data.getTransactionsPage as TransactionsPage;
          this.transactionCards = this.transactionService.getTransactionCards(transactionPage);
          this.length = transactionPage.totalElements as number;
        }
    )
  }

  private handleTo(to: number) {
    console.log(to);
  }

  private handleFrom(from: number) {
    console.log(from);
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setTransactions();
  }

  private setCategories() {
    this.graphqlService.getCategories().subscribe({
      next: v => {
        this.categoryList = (v.data.getCategories as Category[])
          .filter(c => c.parent === null)
          .sort((c1, c2) => c1.income ? 1 : -1);
      }
    });
  }


}
