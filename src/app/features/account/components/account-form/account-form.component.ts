import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { Component, Input, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  colors = ['#FFCE30', '#E389B9', '#746AB0'];
  nameInput: FormControl<any> = new FormControl('', [Validators.required]);
  descriptionInput: FormControl<any> = new FormControl();
  balanceInput: FormControl<any> = new FormControl(0, [Validators.required, Validators.min(0)]);
  @ViewChild("archivedToggle")
  archivedToggle: MatSlideToggle;
  accountTypeSelect: FormControl<any> = new FormControl('', [Validators.required]);
  colorSelect: FormControl<any> = new FormControl(this.colors[0], [Validators.required]);
  isCreate: boolean = false;

  formGroup: FormGroup = this.fb.group({
    nameInput: this.nameInput,
    descriptionInput: this.descriptionInput,
    balanceInput: this.balanceInput,
    accountTypeSelect: this.accountTypeSelect,
    colorSelect: this.colorSelect,
  });


  accountTypes = [AccountType.Regular, AccountType.Savings];

  constructor(
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.isCreate = (this.hash == null);
    if(!this.isCreate){
      this.graphqlService.getAccount(this.hash).subscribe({
        next: (v) => this.setAccount(v.data.getAccount as Account),
        error: (err) => console.log(err),
      });
    }

  }

  deleteAccount() {
    this.accountService.deleteAccount(this.hash);
  }
  saveAccount() {
    if(this.formGroup.valid){
      if(this.isCreate){
        this.accountService.addAccount(this.formGroup, this.archivedToggle);
      } else {
        this.accountService.updateAccount(this.formGroup, this.archivedToggle, this.hash);
      }
    }
  }

  setAccount(account: Account): void {
    this.nameInput.setValue(account.name);
    this.descriptionInput.setValue(account.description);
    this.accountTypeSelect.setValue(account.accountType);
    this.balanceInput.setValue(account.balance);
    this.archivedToggle.checked = account.archived;
    this.colorSelect.setValue(account.color);
  }
}
