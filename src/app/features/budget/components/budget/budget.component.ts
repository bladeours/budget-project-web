import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { BudgetDto } from '../../../../graphql/__generated__';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  budgets: BudgetDto[] = [];
  date: Date;
  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.setBudgets();
  }

  private setBudgets() {
    this.graphqlService
      .getBudgets('2023-12-09T15:52:18.526275423+01:00')
      .subscribe((v) => (this.budgets = v.data.getBudgets as BudgetDto[]));
  }

  setDate($event: Date) {
    this.date = $event;
  }
}
