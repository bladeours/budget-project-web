import { GraphqlService } from './../../../../graphql/service/graphql.service';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Account, AccountType } from '../../../../graphql/__generated__';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent {
  @Input()
  hash: string;

  nameInput: FormControl<any> = new FormControl();
  descriptionInput: FormControl<any> = new FormControl();
  balanceInput: FormControl<any> = new FormControl();
  @ViewChild("archivedToggle")
  archivedToggle: MatSlideToggle;
  accountTypeSelect: FormControl<any> = new FormControl();
  colorSelect: FormControl<any> = new FormControl();

  formGroup: FormGroup = this.fb.group({
    nameInput: this.nameInput,
    descriptionInput: this.descriptionInput,
    balanceInput: this.balanceInput,
    accountTypeSelect: this.accountTypeSelect,
    colorSelect: this.colorSelect,
  });

  colors = ['#FFCE30', '#E389B9', '#746AB0'];
  accountTypes = [AccountType.Regular, AccountType.Savings];

  constructor(
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.graphqlService.getAccount(this.hash).subscribe({
      next: (v) => this.setAccount(v.data.getAccount as Account),
      error: (err) => console.log(err),
    });
  }

  deleteAccount() {
    throw new Error('Method not implemented.');
  }
  saveAccount() {
    if(this.formGroup.valid){
      this.accountService.createAccount(this.formGroup, this.archivedToggle, this.hash);
    }
  }

  setAccount(account: Account): void {
    console.log(account)
    this.nameInput.setValue(account.name);
    this.descriptionInput.setValue(account.description);
    this.accountTypeSelect.setValue(account.accountType);
    this.balanceInput.setValue(account.balance);
    this.archivedToggle.checked = account.archived;
    this.colorSelect.setValue(account.color);
  }
}
