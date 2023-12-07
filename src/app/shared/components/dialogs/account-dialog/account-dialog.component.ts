import { Component } from '@angular/core';
import {MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {AccountFormComponent} from "../../../../features/account/components/account-form/account-form.component";
import {AccountService} from "../../../../features/account/service/account.service";
import {FormGroup} from "@angular/forms";
import {MatSidenav} from "@angular/material/sidenav";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-account-dialog',
    templateUrl: './account-dialog.component.html',
    styleUrl: './account-dialog.component.scss',

})
export class AccountDialogComponent {


  constructor(private dialogRef: MatDialogRef<AccountDialogComponent>,
              private accountService: AccountService) {
  }


    addAccount(formGroup: FormGroup) {
        this.accountService.addAccount(formGroup);
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }
}
