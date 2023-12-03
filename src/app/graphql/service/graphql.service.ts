import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccountInput,
  AddAccountGQL,
  AddTransactionGQL,
  DeleteAccountGQL,
  DeleteTransactionGQL,
  Filter,
  GetAccountGQL,
  GetAccountsGQL,
  GetCategoriesExpenseHashNameGQL,
  GetCategoriesHashNameGQL,
  GetCategoriesIncomeHashNameGQL,
  GetTransactionsPageGQL,
  Page,
  TransactionInput,
  UpdateAccountGQL,
  UpdateTransactionGQL,
} from '../__generated__';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(
    private getAccountGQL: GetAccountGQL,
    private getTransactionsPageGQL: GetTransactionsPageGQL,
    private getAccountsGQL: GetAccountsGQL,
    private getCategoriesIncomeHashNameGQL: GetCategoriesIncomeHashNameGQL,
    private getCategoriesExpenseHashNameGQL: GetCategoriesExpenseHashNameGQL,
    private addTransactionGQL: AddTransactionGQL,
    private updateTransactionGQL: UpdateTransactionGQL,
    private deleteTransactionGQL: DeleteTransactionGQL,
    private getCategoriesGQL: GetCategoriesHashNameGQL,
    private updateAccountGQL: UpdateAccountGQL,
    private addAccountGQL: AddAccountGQL,
    private deleteAccountGQL: DeleteAccountGQL
  ) {}

  getTransactionsPage(page: Page, filter: Filter): Observable<any> {
    return this.getTransactionsPageGQL.fetch({ page, filter });
  }

  getAccounts(filter: Filter) {
    return this.getAccountsGQL.fetch({ filter });
  }

  getCategories() {
    return this.getCategoriesGQL.fetch();
  }

  getCategoriesIncomeHashName() {
    return this.getCategoriesIncomeHashNameGQL.fetch();
  }

  getCategoriesExpenseHashName() {
    return this.getCategoriesExpenseHashNameGQL.fetch();
  }

  addTransaction(transactionInput: TransactionInput) {
    return this.addTransactionGQL.mutate({ transactionInput });
  }

  updateTransaction(transactionInput: TransactionInput, hash: string) {
    return this.updateTransactionGQL.mutate({ transactionInput, hash });
  }

  deleteTransaction(hash: string) {
    return this.deleteTransactionGQL.mutate({ hash });
  }

  getAccount(hash: string) {
    return this.getAccountGQL.fetch({ hash });
  }

  updateAccount(accountInput: AccountInput, hash: string) {
    return this.updateAccountGQL.mutate({
      hash: hash,
      accountInput: accountInput,
    });
  }

  addAccount(accountInput: AccountInput) {
    return this.addAccountGQL.mutate({ accountInput });
  }

  deleteAccount(hash: string) {
    return this.deleteAccountGQL.mutate({ hash });
  }
}
