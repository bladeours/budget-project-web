import { AccountInput, AccountType, Currency } from './../../../graphql/__generated__';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlService } from 'src/app/graphql/service/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   constructor(private graphqlService: GraphqlService, private snackBar: MatSnackBar) { }

   createAccount(formGroup: FormGroup<any>, archivedToggle: MatSlideToggle, hash: string) {
    let accountInput: AccountInput = {
      accountType: formGroup.get("accountTypeSelect")?.value as AccountType,
      archived: archivedToggle.checked,
      balance: formGroup.get("balanceInput")?.value as number,
      color: formGroup.get("colorSelect")?.value as string,
      currency: Currency.Pln,
      description: formGroup.get("descriptionInput")?.value as string,
      name: formGroup.get("nameInput")?.value as string,
    };

    this.graphqlService.updateAccount(accountInput, hash).subscribe({
      next: v => {
        // window.location.reload();
        this.snackBar.open("Account updated properly", "close", {
          duration: 3000
        });
      }
    });
  }
}
