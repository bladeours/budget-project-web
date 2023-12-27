import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BudgetDto, Maybe, Scalars } from '../../../../graphql/__generated__';
import { MatSnackBarService } from '../../../../shared/service/mat-snack-bar.service';
import { BudgetDialogComponent } from '../../dialog/budget-dialog/budget-dialog.component';
import { BudgetService } from '../../service/budget.service';

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
  toggleLock: Boolean = false;
  constructor(
    private budgetService: BudgetService,
    private dialog: MatDialog,
    private snackBar: MatSnackBarService,
  ) {}


  toggle() {
    // if(!this.toggleLock){
    //   this.subCategoryPanel.toggle();
    // }
  }

  editBudget() {
    console.log("edit")
    this.toggleLock = true;
    this.dialog.open(BudgetDialogComponent, {
      data: { budget: this.budget, date: this.date },
    }).afterClosed().subscribe(() => this.toggleLock = false);
  }

  deleteBudget(hash: Maybe<Scalars['String']['output']> | undefined) {
    this.toggleLock = true;
    this.budgetService.deleteBudget(hash as string).subscribe(() =>
      this.snackBar
        .open('budget deleted properly')
        .afterDismissed()
        .subscribe(() => window.location.reload()),
    );
  }
}
