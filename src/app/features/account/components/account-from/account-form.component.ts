import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AccountType} from "../../../../graphql/__generated__";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  nameInput: FormControl<any> = new FormControl();
  descriptionInput: FormControl<any> = new FormControl();
  balanceInput: FormControl<any> = new FormControl();
  archivedToggle: FormControl<any> = new FormControl();
  accountTypeSelect: FormControl<any> = new FormControl();
  colorPicker: FormControl<any> = new FormControl();

  accountTypes = [AccountType.Regular, AccountType.Savings];
}
