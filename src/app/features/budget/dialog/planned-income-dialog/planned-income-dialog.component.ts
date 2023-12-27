import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarService } from 'src/app/shared/service/mat-snack-bar.service';
import {
  PlannedIncomeDto,
  PlannedIncomeInput,
} from './../../../../graphql/__generated__';
import { GraphqlService } from 'src/app/graphql/service/graphql.service';
import { Utils } from 'src/app/shared/utils/Utils';

@Component({
  selector: 'app-planned-income-dialog',
  templateUrl: './planned-income-dialog.component.html',
  styleUrl: './planned-income-dialog.component.scss',
})
export class PlannedIncomeDialogComponent {
  plannedIncomeInput: FormControl = new FormControl();
  date: Date;
  plannedIncome: PlannedIncomeDto;

  constructor(
    private dialogRef: MatDialogRef<PlannedIncomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { plannedIncome: PlannedIncomeDto; date: Date },
    private snackBar: MatSnackBarService,
    private graphqlService: GraphqlService,
  ) {}

  ngOnInit(): void {
    this.plannedIncome = this.data.plannedIncome;
    this.date = this.data.date;
    this.plannedIncomeInput.setValue(
      this.data.plannedIncome.plannedIncome.amount,
    );
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
    if (this.plannedIncome.plannedIncome.hash == null) {
      this.graphqlService
        .addPlannedIncome(this.getPlannedIncomeInput())
        .subscribe(() =>
          this.snackBar
            .open('budget updated properly')
            .afterDismissed()
            .subscribe(() => window.location.reload()),
        );
    } else {
      this.graphqlService
        .updatePlannedIncome(this.plannedIncome.plannedIncome.hash, this.plannedIncomeInput.value)
        .subscribe(() =>
          this.snackBar
            .open('budget updated properly')
            .afterDismissed()
            .subscribe(() => window.location.reload()),
        );
    }
  }
  getPlannedIncomeInput(): PlannedIncomeInput {
    return {
      amount: this.plannedIncomeInput.value,
      date: Utils.getFullDateString(this.date),
    };
  }
}
