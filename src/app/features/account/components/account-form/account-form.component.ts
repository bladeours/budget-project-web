import { GraphqlService } from '../../../../graphql/service/graphql.service';
import {
  Component,
  ElementRef,
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
import { ColorPickerComponent } from 'src/app/shared/components/color-picker/color-picker.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  @Output()
  addAccountEvent = new EventEmitter<any>();
  @Output()
  closeEvent = new EventEmitter<any>();
  @Input()
  hash: string;
  @ViewChild('openColorPickerButton', { read: ElementRef })
  colorButton: ElementRef;
  currentColor: string;

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
    private dialog: MatDialog,
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
    } else {
      this.currentColor = colors[Math.floor(Math.random()*colors.length)];
      setTimeout(() => {
        this.colorButton.nativeElement.style.backgroundColor = this.currentColor
      } , 2);
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
        this.addAccountEvent.emit({form: this.formGroup, color: this.currentColor});
      } else {
        this.accountService.updateAccount(
          this.formGroup,
          this.archivedToggle,
          this.hash,
          this.currentColor
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
    this.currentColor = account.color;
    this.colorButton.nativeElement.style.backgroundColor = this.currentColor;
  }

  close() {
    this.closeEvent.emit();
  }

  openColorPicker() {
    this.dialog.open(ColorPickerComponent).componentInstance.colorPicked.subscribe(
      color => {
        this.currentColor = color;
        this.colorButton.nativeElement.style.backgroundColor = color;
      }
    );
  }
}
