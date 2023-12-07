import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Account,
  Category,
  Currency, SubCategory,
  TransactionInput,
  TransactionType,
} from '../../../../graphql/__generated__';
import { Utils } from '../../../utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class TransactionDialogService {
  constructor() {}

  public getTransactionInput(formGroup: FormGroup): TransactionInput {
    let accountFromHash: string | null = null;
    let accountToHash: string | null = null;
    let categoryHash: string | null = null;
    let subCategoryHash: string | null = null;
    switch (formGroup.get('type')?.value as unknown as TransactionType) {
      case TransactionType.Expense:
        if (
          formGroup.get('subCategoryExpense')?.value !== undefined &&
          formGroup.get('subCategoryExpense')?.value !== null
        ) {
          subCategoryHash = (
            formGroup.get('subCategoryExpense')?.value as unknown as SubCategory
          ).hash;
        }
        categoryHash = (formGroup.get('right')?.value as unknown as Category)
          .hash;
        accountFromHash = (formGroup.get('left')?.value as unknown as Account)
          .hash;
        break;
      case TransactionType.Income:
        if (
          formGroup.get('subCategoryIncome')?.value !== undefined &&
          formGroup.get('subCategoryIncome')?.value !== null
        ) {
          subCategoryHash = (
            formGroup.get('subCategoryIncome')?.value as unknown as SubCategory
          ).hash;
        }
        categoryHash = (formGroup.get('left')?.value as unknown as Category)
          .hash;
        accountToHash = (formGroup.get('right')?.value as unknown as Account)
          .hash;
        break;
      case TransactionType.Transfer:
        accountFromHash = (formGroup.get('left')?.value as unknown as Account)
          .hash;
        accountToHash = (formGroup.get('right')?.value as unknown as Account)
          .hash;
        break;
    }
    return {
      accountFromHash: accountFromHash,
      accountToHash: accountToHash,
      categoryHash: categoryHash,
      name: '',
      currency: Currency.Pln,
      date: Utils.getFullDateString(formGroup.get('date')?.value),
      transactionType: formGroup.get('type')?.value,
      amount: formGroup.get('amount')?.value as number,
      note: formGroup.get('note')?.value,
      need: formGroup.get('need')?.value !== 'need',
      subCategoryHash: subCategoryHash,
    };
  }
}
