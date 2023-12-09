import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import {
  Account,
  Category,
  SubCategory,
  TransactionType,
} from '../../../../graphql/__generated__';
import { GraphqlService } from '../../../../graphql/service/graphql.service';
import { TransactionCard } from '../../../../shared/models/TransactionCard';
import { TransactionDialogService } from '../../service/transaction-dialog.service';
import { MatSnackBarService } from '../../../../shared/service/mat-snack-bar.service';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss',
})
export class TransactionDialogComponent implements OnInit {
  typeGridCol: number;
  dateGridCol: number;
  leftGridCol: number;
  rightGridCol: number;
  amountGridCol: number;
  noteGridCol: number;
  incomeSubCategoryCol: number;
  expenseSubCategoryCol: number;
  typeSelect: FormControl<any> = new FormControl(TransactionType.Expense, [
    Validators.required,
  ]);
  needCheckBox: FormControl<undefined | string> = new FormControl();
  incomeSubCategorySelect = new FormControl();
  expenseSubCategorySelect = new FormControl();
  amount: FormControl<any> = new FormControl(null, [Validators.required]);
  note = new FormControl('');
  typeList: TransactionType[] = [
    TransactionType.Expense,
    TransactionType.Income,
    TransactionType.Transfer,
  ];
  datePicker: FormControl<any> = new FormControl(new Date(), [
    Validators.required,
  ]);
  leftLabel: string = 'From Account';
  rightLabel: string = 'Category';
  leftSelect: FormControl<any> = new FormControl(null, [Validators.required]);
  rightSelect: FormControl<any> = new FormControl(null, [Validators.required]);
  leftObjects: any[] = [];
  rightObjects: any[] = [];
  accounts: Account[] = [];
  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];
  incomeSubCategories: SubCategory[] = [];
  expenseSubCategories: SubCategory[] = [];
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
    need: this.needCheckBox,
  });
  title: string = 'Add Transaction';
  isUpdate: boolean = false;
  protected readonly window = window;
  protected readonly TransactionType = TransactionType;

  constructor(
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private observer: BreakpointObserver,
    private graphqlService: GraphqlService,
    private fb: FormBuilder,
    private transactionDialogService: TransactionDialogService,
    @Inject(MAT_DIALOG_DATA) public data: TransactionCard,
    private matSnackBarService: MatSnackBarService,
  ) {}

  ngOnInit() {
    this.isUpdate = this.data !== null;
    this.setData();
    this.typeSelect.valueChanges.subscribe((v) => this.handleChangeType(v));
    this.leftSelect.valueChanges.subscribe((v) => this.handleChangeLeft(v));
    this.rightSelect.valueChanges.subscribe((v) => this.handleChangeRight(v));

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
      let transactionInput = this.transactionDialogService.getTransactionInput(
        this.formGroup,
      );
      if (this.isUpdate) {
        this.graphqlService
          .updateTransaction(transactionInput, this.data.hash)
          .subscribe({
            next: () => {
              this;
              this.matSnackBarService
                .open('Transaction Updated')
                .afterDismissed()
                .subscribe(() => window.location.reload());
            },
          });
      } else {
        this.graphqlService.addTransaction(transactionInput).subscribe({
          next: () => {
            this.matSnackBarService
              .open('Transaction Created')
              .afterDismissed()
              .subscribe(() => window.location.reload());
          },
        });
      }
      this.dialogRef.close();
    }
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.hash == object2.hash;
  }

  deleteTransaction() {
    this.graphqlService.deleteTransaction(this.data.hash).subscribe({
      next: (v) => {
        this.matSnackBarService
          .open('Transaction deleted')
          .afterDismissed()
          .subscribe(() => window.location.reload());
      },
    });
  }

  private handleChangeType(type: TransactionType) {
    switch (type) {
      case TransactionType.Transfer:
        this.leftLabel = 'From Account';
        this.rightLabel = 'To Account';
        this.leftObjects = this.accounts;
        this.rightObjects = this.accounts;
        break;
      case TransactionType.Income:
        this.leftLabel = 'From Category';
        this.rightLabel = 'To Account';
        this.leftObjects = this.incomeCategories;
        this.rightObjects = this.accounts;
        break;
      case TransactionType.Expense:
        this.leftLabel = 'From Account';
        this.rightLabel = 'Category';
        this.leftObjects = this.accounts;
        this.rightObjects = this.expenseCategories;
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
      if (
        parentCategory.subCategories != undefined &&
        parentCategory.subCategories?.length > 0
      ) {
        this.showIncomeSubCategories = true;
        this.handleShowIncomeSubCategories();
        this.incomeSubCategories =
          parentCategory.subCategories as SubCategory[];
      } else {
        this.hideIncomeSubCategories();
      }
    }
  }

  private handleChangeRight(v: any) {
    if (this.typeSelect.value === TransactionType.Expense) {
      let parentCategory = v as Category;
      if (
        parentCategory.subCategories != undefined &&
        parentCategory.subCategories?.length > 0
      ) {
        this.showExpenseSubCategories = true;
        this.handleShowExpenseSubCategories();
        this.expenseSubCategories =
          parentCategory.subCategories as SubCategory[];
      } else {
        this.hideExpenseSubCategories();
      }
    }
  }

  private setData() {
    forkJoin({
      accounts: this.graphqlService.getAccounts({}),
      incomeCategories: this.graphqlService.getCategoriesIncomeHashName(),
      expenseCategories: this.graphqlService.getCategoriesExpenseHashName(),
    }).subscribe({
      next: (v) => {
        this.accounts = v.accounts.data.getAccounts as Array<Account>;
        this.leftObjects = this.accounts;

        this.incomeCategories = v.incomeCategories.data
          .getCategories as Array<Category>;

        this.expenseCategories = v.expenseCategories.data
          .getCategories as Array<Category>;
        this.rightObjects = this.expenseCategories;
        if (this.isUpdate) {
          this.fillFields();
        }
      },
    });
  }

  private fillFields() {
    this.typeSelect.setValue(this.data.type);
    this.datePicker.setValue(this.data.date.date);
    this.title = 'Update Transaction';
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
        this.needCheckBox.setValue(this.data.need ? undefined : 'need');
        break;
      case TransactionType.Transfer:
        this.leftSelect.setValue(this.data.account);
        this.rightSelect.setValue(this.data.category);
    }
  }
}
