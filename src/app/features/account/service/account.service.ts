import {AccountInput, AccountType, Currency} from './../../../graphql/__generated__';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GraphqlService} from 'src/app/graphql/service/graphql.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private graphqlService: GraphqlService, private snackBar: MatSnackBar, private router: Router) {
  }

  updateAccount(formGroup: FormGroup<any>, archivedToggle: MatSlideToggle, hash: string) {
    let accountInput: AccountInput = this.getAccountInput(formGroup, archivedToggle);
    this.graphqlService.updateAccount(accountInput, hash).subscribe({
      next: v => {
        this.snackBar.open("Account updated properly", "close", {
          duration: 2000
        }).afterDismissed().subscribe(() => window.location.reload());
      }
    });
  }

  addAccount(formGroup: FormGroup, archivedToggle: MatSlideToggle) {
    let accountInput: AccountInput = this.getAccountInput(formGroup, archivedToggle);
    this.graphqlService.addAccount(accountInput).subscribe({
      next: v => {
        this.snackBar.open("Account created properly", "close", {
          duration: 2000
        }).afterDismissed()
          .subscribe(() =>
            this.router.navigate(["account"], {queryParams: {id: v.data?.addAccount?.hash}}).then(() => window.location.reload()));
      }
    })
  }

  private getAccountInput(formGroup: FormGroup, archivedToggle: MatSlideToggle): AccountInput {
    return {
      accountType: formGroup.get("accountTypeSelect")?.value as AccountType,
      archived: archivedToggle.checked,
      balance: formGroup.get("balanceInput")?.value as number,
      color: formGroup.get("colorSelect")?.value as string,
      currency: Currency.Pln,
      description: formGroup.get("descriptionInput")?.value as string,
      name: formGroup.get("nameInput")?.value as string,
    };
  }

  deleteAccount(hash: string) {
    this.graphqlService.deleteAccount(hash).subscribe({
      next: () => {
        this.snackBar.open("Account deleted properly", "close", {
          duration: 2000
        }).afterDismissed()
          .subscribe(() =>
            this.router.navigate(["account"]).then(() => window.location.reload()));
      }
    })
  }
}
