import {Component, inject} from '@angular/core';
import {Transaction} from "../../../../shared/models/Transaction";
import {FormControl, FormGroup} from "@angular/forms";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {debounceTime} from "rxjs";
import {GraphqlService} from "../../../../graphql/service/graphql.service";

@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  transactionCards: Transaction[] = [];
  categories = new FormControl('');
  from = new FormControl();
  to = new FormControl();
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  announcer = inject(LiveAnnouncer);
  categoryList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(private graphqlService: GraphqlService) {
  }

  ngOnInit() {
    this.categories.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleChangeCategories(v));
    this.from.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleFrom(v));
    this.to.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleTo(v));
    this.range.valueChanges.pipe(debounceTime(1000)).subscribe(v => this.handleRange(v));
  }
  ngAfterViewInit() {
    this.transactionCards = this.getLatestTransactions();
  }

  handleRange(v :any) {
    console.log(v.end);
    console.log(v.start);
  }

  handleChangeCategories(value: string | null) {
    if(value === null) {
      return;
    }
    console.log(value);
  }

  getLatestTransactions() {
    let transactionCard: Transaction = new Transaction();
    transactionCard.icon = "money_off";
    transactionCard.category = "Public Transport";
    transactionCard.account = "Santander";
    transactionCard.amount = 21.53;
    transactionCard.date = "2023-01-20"
    return [transactionCard, transactionCard,transactionCard, transactionCard, transactionCard, transactionCard, transactionCard, transactionCard, transactionCard, transactionCard]
  }

  private handleTo(to: number) {
    this.graphqlService.handleTo(to);
    console.log(to);
  }

  private handleFrom(from: number) {
    console.log(from);
  }
}
