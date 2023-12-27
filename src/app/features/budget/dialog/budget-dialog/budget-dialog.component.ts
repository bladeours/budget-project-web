import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BudgetService } from '../../service/budget.service';
import { FormControl } from '@angular/forms';
import { BudgetDto } from '../../../../graphql/__generated__';
import { MatSnackBarService } from '../../../../shared/service/mat-snack-bar.service';

@Component({
  selector: 'app-budget-dialog',
  templateUrl: './budget-dialog.component.html',
  styleUrl: './budget-dialog.component.scss',
})
export class BudgetDialogComponent implements OnInit {
  plannedBudgetInput: FormControl = new FormControl();
  budget: BudgetDto;
  date: Date;

  constructor(
    private dialogRef: MatDialogRef<BudgetDialogComponent>,
    private budgetService: BudgetService,
    @Inject(MAT_DIALOG_DATA) public data: { budget: BudgetDto; date: Date },
    private snackBar: MatSnackBarService,
  ) {}

  ngOnInit(): void {
    this.budget = this.data.budget;
    this.date = this.data.date;
    this.plannedBudgetInput.setValue(this.data.budget.budget?.plannedBudget); 
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
    if (this.budget.budget?.hash == null) {
      this.budgetService
        .createBudget(
          this.plannedBudgetInput.value,
          this.budget.budget?.category?.hash as string,
          this.date,
        )
        .subscribe(() =>
          this.snackBar
            .open('budget updated properly')
            .afterDismissed()
            .subscribe(() => window.location.reload()),
        );
    } else {
      this.budgetService
        .updateBudget(this.plannedBudgetInput.value, this.budget.budget.hash)
        .subscribe(() =>
          this.snackBar
            .open('budget updated properly')
            .afterDismissed()
            .subscribe(() => window.location.reload()),
        );
    }
  }
}
