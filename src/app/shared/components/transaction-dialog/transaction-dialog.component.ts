import {MatSelectModule} from '@angular/material/select';
import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Account, Category, TransactionType} from "../../../graphql/__generated__";
import {GraphqlService} from "../../../graphql/service/graphql.service";
import {TransactionDialogService} from "./transaction-dialog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TransactionCard} from "../../models/TransactionCard";
import {forkJoin} from "rxjs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    CurrencyMaskModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule, MatCheckboxModule, MatChipsModule],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss'
})
export class TransactionDialogComponent {
  typeGridCol: number;
  dateGridCol: number;
  leftGridCol: number;
  rightGridCol: number;
  amountGridCol: number;
  noteGridCol: number;
  incomeSubCategoryCol: number;
  expenseSubCategoryCol: number;
  typeSelect: FormControl<any> = new FormControl(TransactionType.Expense, [Validators.required]);
  needCheckBox: FormControl<undefined | string> = new FormControl();
  incomeSubCategorySelect = new FormControl();
  expenseSubCategorySelect = new FormControl();
  amount: FormControl<any> = new FormControl(null, [Validators.required]);
  note = new FormControl("");
  typeList: TransactionType[] = [TransactionType.Expense, TransactionType.Income, TransactionType.Transfer];
  datePicker: FormControl<any> = new FormControl(new Date(), [Validators.required]);
  leftLabel: string = "From Account";
  rightLabel: string = "Category";
  leftSelect: FormControl<any> = new FormControl(null, [Validators.required]);
  rightSelect: FormControl<any> = new FormControl(null, [Validators.required]);
  leftObjects: any[] = [];
  rightObjects: any[] = [];
  accounts: Account[] = [];
  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];
  incomeSubCategories: Category[] = [];
  expenseSubCategories: Category[] = [];
  showIncomeSubCategories: boolean = false;
  showExpenseSubCategories: boolean = false;
  formGroup: FormGroup = this.fb.group({
    type: this.typeSelect,
    date: this.datePicker,
    left: this.leftSelect,
    right: this.rightSelect,
    amount: this.amount,
    note: this.note,
    subCategoryIncome: this.incomeSubCategorySelect,
    subCategoryExpense: this.expenseSubCategorySelect,
    need: this.needCheckBox
  });
  protected readonly window = window;
  title: string = "Add Transaction";
  isUpdate: boolean = false;
  protected readonly TransactionType = TransactionType;


  constructor(private dialogRef: MatDialogRef<TransactionDialogComponent>, private observer: BreakpointObserver,
              private graphqlService: GraphqlService, private fb: FormBuilder,
              private transactionDialogService: TransactionDialogService, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: TransactionCard) {
  }

  ngAfterViewInit() {
    this.isUpdate = this.data !== null;
    this.setData();
    this.typeSelect.valueChanges.subscribe(v => this.handleChangeType(v));
    this.leftSelect.valueChanges.subscribe(v => this.handleChangeLeft(v));
    this.rightSelect.valueChanges.subscribe(v => this.handleChangeRight(v));

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.typeGridCol = 4;
        this.dateGridCol = 4;
        this.leftGridCol = 4;
        this.rightGridCol = 4;
        this.amountGridCol = 4;
        this.noteGridCol = 4;
        this.handleShowExpenseSubCategories();
        this.handleShowIncomeSubCategories();
      } else {
        this.typeGridCol = 2;
        this.dateGridCol = 2;
        this.leftGridCol = 2;
        this.rightGridCol = 2;
        this.amountGridCol = 4;
        this.noteGridCol = 4;
        this.handleShowExpenseSubCategories();
        this.handleShowIncomeSubCategories();
      }
    });

  }

  saveTransaction(): void {
    if (this.formGroup.valid) {
      let transactionInput = this.transactionDialogService.getTransactionInput(this.formGroup);
      if(this.isUpdate){
        this.graphqlService.updateTransaction(transactionInput, this.data.hash).subscribe(
          {
            next: value => {
              this._snackBar.open("Transaction Updated", "Got it", {duration: 3000});
              window.location.reload();
            },
            error: err => this._snackBar.open("Something went wrong", "Got it", {duration: 3000})
          });
      } else {
        this.graphqlService.addTransaction(transactionInput).subscribe(
          {
            next: value => {
              this._snackBar.open("Transaction Created", "Got it", {duration: 3000});
              window.location.reload();
            },
            error: err => this._snackBar.open("Something went wrong", "Got it", {duration: 3000})
          });
      }

      this.dialogRef.close();
    }
  }

  private handleChangeType(type: TransactionType) {
    switch (type) {
      case TransactionType.Transfer:
        this.leftLabel = "From Account";
        this.rightLabel = "To Account";
        this.leftObjects = this.accounts;
        this.rightObjects = this.accounts;
        break;
      case TransactionType.Income:
        this.leftLabel = "From Category";
        this.rightLabel = "To Account";
        this.leftObjects = this.incomeCategories.filter(c => c.parent === null);
        this.rightObjects = this.accounts;
        break;
      case TransactionType.Expense:
        this.leftLabel = "From Account";
        this.rightLabel = "Category";
        this.leftObjects = this.accounts;
        this.rightObjects = this.expenseCategories.filter(c => c.parent === null);
        break;
    }
    this.hideIncomeSubCategories();
    this.hideExpenseSubCategories();
  }

  private handleShowIncomeSubCategories() {
    if (this.showIncomeSubCategories) {
      if (window.innerWidth < 800) {
        this.incomeSubCategoryCol = 4;
      } else {
        this.incomeSubCategoryCol = 2;
      }
    }
  }

  private handleShowExpenseSubCategories() {
    if (this.showExpenseSubCategories) {
      if (window.innerWidth < 800) {
        this.expenseSubCategoryCol = 4;
      } else {
        this.expenseSubCategoryCol = 2;
      }
    }
  }

  private hideIncomeSubCategories() {
    this.showIncomeSubCategories = false;
    this.incomeSubCategoryCol = 0;
  }

  private hideExpenseSubCategories() {
    this.showExpenseSubCategories = false;
    this.expenseSubCategoryCol = 0;
  }

  private handleChangeLeft(v: any) {
    if (this.typeSelect.value === TransactionType.Income) {
      let parentCategory = v as Category;
      if (parentCategory.subCategories != undefined && parentCategory.subCategories?.length > 0) {
        this.showIncomeSubCategories = true;
        this.handleShowIncomeSubCategories();
        this.incomeSubCategories = parentCategory.subCategories as Category[];
      } else {
        this.hideIncomeSubCategories();
      }
    }
  }

  private handleChangeRight(v: any) {
    if (this.typeSelect.value === TransactionType.Expense) {
      let parentCategory = v as Category;
      if (parentCategory.subCategories != undefined && parentCategory.subCategories?.length > 0) {
        this.showExpenseSubCategories = true;
        this.handleShowExpenseSubCategories();
        this.expenseSubCategories = parentCategory.subCategories as Category[];
      } else {
        this.hideExpenseSubCategories()
      }
    }
  }

  private setData() {
    forkJoin({
      accounts: this.graphqlService.getAccounts({}),
      incomeCategories: this.graphqlService.getCategoriesIncomeHashName(),
      expenseCategories: this.graphqlService.getCategoriesExpenseHashName()
    }).subscribe({
      next: v => {
        this.accounts = v.accounts.data.getAccounts as Array<Account>;
        this.leftObjects = this.accounts;

        this.incomeCategories = v.incomeCategories.data.getCategories as Array<Category>;

        this.expenseCategories = v.expenseCategories.data.getCategories as Array<Category>;
        this.rightObjects = this.expenseCategories.filter(c => c.parent === null);
        if(this.isUpdate){
          this.fillFields();
        }
      },
      error: v => console.log(v)
    })
  }

  private fillFields() {
    this.typeSelect.setValue(this.data.type);
    this.datePicker.setValue(this.data.date.date);
    this.title = "Update Transaction";
    this.amount.setValue(Math.abs(this.data.amount.amount));
    this.note.setValue(this.data.note);
    switch (this.data.type) {
      case TransactionType.Income:
        this.leftSelect.setValue(this.data.category);
        this.rightSelect.setValue(this.data.account);
        this.incomeSubCategorySelect.setValue(this.data.subCategory);
        break;
      case TransactionType.Expense:
        this.leftSelect.setValue(this.data.account);
        this.rightSelect.setValue(this.data.category);
        this.expenseSubCategorySelect.setValue(this.data.subCategory);
        this.needCheckBox.setValue(this.data.need ? undefined : "need");
        break;
      case TransactionType.Transfer:
        this.leftSelect.setValue(this.data.account);
        this.rightSelect.setValue(this.data.category);
    }

  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.hash == object2.hash;
  }

  deleteTransaction() {
    this.graphqlService.deleteTransaction(this.data.hash).subscribe({
      next: v => {
        this._snackBar.open("Transaction deleted", "Got it", {duration: 3000});
        window.location.reload();
      },
      error: v => {
        this._snackBar.open("Something went wrong", "Got it", {duration: 3000});
        window.location.reload();
      }
    })
  }


}
