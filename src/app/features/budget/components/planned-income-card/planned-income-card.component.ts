import { MatSnackBarService } from './../../../../shared/service/mat-snack-bar.service';
import { gql } from 'apollo-angular';
import { GraphqlService } from './../../../../graphql/service/graphql.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlannedIncome, PlannedIncomeDto } from 'src/app/graphql/__generated__';
import { PlannedIncomeDialogComponent } from '../../dialog/planned-income-dialog/planned-income-dialog.component';

@Component({
  selector: 'app-planned-income-card',
  templateUrl: './planned-income-card.component.html',
  styleUrl: './planned-income-card.component.scss'
})
export class PlannedIncomeCardComponent {
  @Input()
 plannedIncome: PlannedIncomeDto;
 @Input()
 date: Date;

  constructor(private dialog: MatDialog,
    private graphqlService: GraphqlService,
    private snackBar: MatSnackBarService
    ) {}

 editPlannedIncome() {
  this.dialog.open(PlannedIncomeDialogComponent, {
    data: { plannedIncome: this.plannedIncome, date: this.date },
  });
 }

 deletePlannedIncome() {
  this.graphqlService.deletePlannedIncome(this.plannedIncome.plannedIncome.hash as string).subscribe(() =>
      this.snackBar
        .open('planned income deleted properly')
        .afterDismissed()
        .subscribe(() => window.location.reload()),
    );
 }
}

