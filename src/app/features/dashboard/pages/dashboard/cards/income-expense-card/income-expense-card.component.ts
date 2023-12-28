import { Component } from '@angular/core';
import { myGreen, myRed } from 'src/app/environments/environment';

@Component({
  selector: 'app-income-expense-card',
  templateUrl: './income-expense-card.component.html',
  styleUrl: './income-expense-card.component.scss',
})
export class IncomeExpenseCardComponent {
  myGreen: any = myGreen;
  myRed = myRed;
  income: number = 2323.32;
  expense: number = 132.42;


}
