import {
  AccountInput,
  AccountType,
  Currency,
} from '../../../graphql/__generated__';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { GraphqlService } from 'src/app/graphql/service/graphql.service';
import { Router } from '@angular/router';
import { MatSnackBarService } from '../../../shared/service/mat-snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private graphqlService: GraphqlService,
    private matSnackBarService: MatSnackBarService,
    private router: Router,
  ) {}

  updateAccount(
    formGroup: FormGroup<any>,
    archivedToggle: MatSlideToggle,
    hash: string,
    color: string
  ) {
    let accountInput: AccountInput = this.getAccountInput(
      formGroup,
      archivedToggle,
      color
    );
    this.graphqlService.updateAccount(accountInput, hash).subscribe({
      next: (v) => {
        this.matSnackBarService
          .open('Account updated properly')
          .afterDismissed()
          .subscribe(() => window.location.reload());
      },
    });
  }

  addAccount(formGroup: FormGroup, color: string) {
    let accountInput: AccountInput = this.getAccountInputForAdd(formGroup, color);
    this.graphqlService.addAccount(accountInput).subscribe({
      next: (v) => {
        this.matSnackBarService
          .open('Account created properly')
          .afterDismissed()
          .subscribe(() =>
            this.router
              .navigate(['account'], {
                queryParams: { id: v.data?.addAccount?.hash },
              })
              .then(() => window.location.reload()),
          );
      },
    });
  }

  deleteAccount(hash: string) {
    this.graphqlService.deleteAccount(hash).subscribe({
      next: () => {
        this.matSnackBarService
          .open('Account deleted properly')
          .afterDismissed()
          .subscribe(() =>
            this.router.navigate(['']).then(() => window.location.reload()),
          );
      },
    });
  }

  private getAccountInputForAdd(formGroup: FormGroup, color: string): AccountInput {
    return {
      accountType: formGroup.get('accountTypeSelect')?.value as AccountType,
      archived: false,
      balance: formGroup.get('balanceInput')?.value as number,
      color: color,
      currency: Currency.Pln,
      description: formGroup.get('descriptionInput')?.value as string,
      name: formGroup.get('nameInput')?.value as string,
    };
  }

  private getAccountInput(
    formGroup: FormGroup,
    archivedToggle: MatSlideToggle,
    color: string
  ): AccountInput {
    return {
      accountType: formGroup.get('accountTypeSelect')?.value as AccountType,
      archived: archivedToggle.checked,
      balance: formGroup.get('balanceInput')?.value as number,
      color: color,
      currency: Currency.Pln,
      description: formGroup.get('descriptionInput')?.value as string,
      name: formGroup.get('nameInput')?.value as string,
    };
  }
}
