import { GraphqlService } from '../../../../graphql/service/graphql.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Account, AccountType } from '../../../../graphql/__generated__';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AccountService } from '../../service/account.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { colors } from '../../../../environments/environment';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  @Output()
  addAccountEvent = new EventEmitter<FormGroup>();
  @Output()
  closeEvent = new EventEmitter<any>();
  @Input()
  hash: string;
  protected readonly colors = colors;
  nameInput: FormControl<any> = new FormControl('', [Validators.required]);
  descriptionInput: FormControl<any> = new FormControl();
  balanceInput: FormControl<any> = new FormControl(0, [
    Validators.required,
    Validators.min(0),
  ]);
  @ViewChild('archivedToggle')
  archivedToggle: MatSlideToggle;
  accountTypeSelect: FormControl<any> = new FormControl('', [
    Validators.required,
  ]);
  colorSelect: FormControl<any> = new FormControl(colors[0], [
    Validators.required,
  ]);
  isCreate: boolean = false;

  formGroup: FormGroup = this.fb.group({
    nameInput: this.nameInput,
    descriptionInput: this.descriptionInput,
    balanceInput: this.balanceInput,
    accountTypeSelect: this.accountTypeSelect,
    colorSelect: this.colorSelect,
  });

  nameCol: number;
  typeCol: number;
  colorCol: number;
  descriptionCol: number;
  balanceCol: number;

  accountTypes = [AccountType.Regular, AccountType.Savings];

  constructor(
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    private accountService: AccountService,
    private observer: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.isCreate = this.hash == null;
    if (!this.isCreate) {
      this.graphqlService.getAccount(this.hash).subscribe({
        next: (v) => this.setAccount(v.data.getAccount as Account),
      });
    }

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches && this.isCreate) {
        this.nameCol = 2;
        this.typeCol = 2;
        this.colorCol = 2;
        this.descriptionCol = 2;
        this.balanceCol = 2;
      } else {
        this.nameCol = 1;
        this.typeCol = 1;
        this.colorCol = 1;
        this.descriptionCol = 2;
        this.balanceCol = 1;
      }
    });
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.hash);
  }

  saveAccount() {
    if (this.formGroup.valid) {
      if (this.isCreate) {
        this.addAccountEvent.emit(this.formGroup);
      } else {
        this.accountService.updateAccount(
          this.formGroup,
          this.archivedToggle,
          this.hash,
        );
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

  close() {
    this.closeEvent.emit();
  }
}
