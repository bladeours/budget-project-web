import { Component, Input, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BudgetDto, Maybe, Scalars } from '../../../../graphql/__generated__';
import { BudgetService } from '../../service/budget.service';
import { MatDialog } from '@angular/material/dialog';
import { BudgetDialogComponent } from '../../dialog/budget-dialog/budget-dialog.component';
import { MatSnackBarService } from '../../../../shared/service/mat-snack-bar.service';

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss',
})
export class BudgetCardComponent {
  @ViewChild('subCategoryPanel')
  subCategoryPanel: MatExpansionPanel;
  @Input()
  budget: BudgetDto;
  @Input()
  date: Date;
  constructor(
    private budgetService: BudgetService,
    private dialog: MatDialog,
    private snackBar: MatSnackBarService,
  ) {}
  toggle() {
    this.subCategoryPanel.toggle();
  }

  editBudget(hash: Maybe<Scalars['String']['output']> | undefined) {
    console.log(this.date);
    this.dialog.open(BudgetDialogComponent, {
      data: { budget: this.budget, date: this.date },
    });
  }

  deleteBudget(hash: Maybe<Scalars['String']['output']> | undefined) {
    this.budgetService.deleteBudget(hash as string).subscribe(() =>
      this.snackBar
        .open('budget deleted properly')
        .afterDismissed()
        .subscribe(() => window.location.reload()),
    );
  }
}
