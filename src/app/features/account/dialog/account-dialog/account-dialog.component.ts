import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../service/account.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss',
})
export class AccountDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    private accountService: AccountService,
  ) {}

  addAccount(formGroup: FormGroup) {
    this.accountService.addAccount(formGroup);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
