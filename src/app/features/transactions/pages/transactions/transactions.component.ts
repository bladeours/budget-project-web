import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, ElementRef, HostListener, Renderer2, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { debounceTime } from "rxjs";
import { TransactionsPage } from "../../../../graphql/__generated__";
import { GraphqlService } from "../../../../graphql/service/graphql.service";
import { TransactionCard } from "../../../../shared/models/TransactionCard";
import { TransactionService } from "../../service/transaction.service";

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
  categories = new FormControl('');
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

  announcer = inject(LiveAnnouncer);
  categoryList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(private graphqlService: GraphqlService, private transactionService: TransactionService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.categories.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleChangeCategories(v));
    this.from.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleFrom(v));
    this.to.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleTo(v));
    this.range.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleRange(v));
  }
  ngAfterViewInit() {
    this.setRealTransactions();
    this.resizeTransactionWrapper();
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

  handleChangeCategories(value: string | null) {
    if(value === null) {
      return;
    }
  }

  setRealTransactions() {
    this.graphqlService.getTransactionsPage({number: this.pageIndex, size: this.pageSize}, {}).subscribe(
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
    this.setRealTransactions();
  }

  handleTransactionClick(hash: string) {
    alert(hash);
  }
}
