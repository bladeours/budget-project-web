import {
  PlannedIncome,
  PlannedIncomeDto,
} from './../../../../graphql/__generated__';
import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { BudgetDto } from '../../../../graphql/__generated__';
import { Utils } from 'src/app/shared/utils/Utils';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  budgets: BudgetDto[] = [];
  plannedIncome: PlannedIncomeDto;
  date: Date;
  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.setData();
  }

  private setData() {
    forkJoin({
      budgets: this.graphqlService.getBudgets(Utils.getFullDateString(this.date)),
      plannedIncome: this.graphqlService.getPlannedIncome(Utils.getFullDateString(this.date))
    }).subscribe(v => {
      this.plannedIncome = v.plannedIncome.data.getPlannedIncome as PlannedIncomeDto,
      this.budgets = v.budgets.data.getBudgets as BudgetDto[]
    });
  }

  setDate($event: Date) {
    this.date = $event;
    this.setData();
  }
}
