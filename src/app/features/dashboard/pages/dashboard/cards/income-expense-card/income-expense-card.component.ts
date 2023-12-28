import { Component, OnInit } from '@angular/core';
import { myGreen, myRed } from 'src/app/environments/environment';
import { GraphqlService } from '../../../../../../graphql/service/graphql.service';
import { Utils } from '../../../../../../shared/utils/Utils';

@Component({
  selector: 'app-income-expense-card',
  templateUrl: './income-expense-card.component.html',
  styleUrl: './income-expense-card.component.scss',
})
export class IncomeExpenseCardComponent implements OnInit {
  myGreen: any = myGreen;
  myRed = myRed;
  income: number = 0;
  expense: number = 0;

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.graphqlService
      .getIncomeExpense(Utils.getFullDateString(new Date()))
      .subscribe((v) => {
        this.income = v.data.getIncomeExpense?.income as number;
        this.expense = v.data.getIncomeExpense?.expense as number;
      });
  }
}
