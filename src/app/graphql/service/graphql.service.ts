import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccountInput,
  AddAccountGQL, AddCategoryGQL,
  AddTransactionGQL, CategoryInput, CategoryUpdateInput,
  DeleteAccountGQL, DeleteCategoryGQL,
  DeleteTransactionGQL,
  Filter,
  GetAccountGQL,
  GetAccountsGQL,
  GetCategoriesExpenseHashNameGQL,
  GetCategoriesHashNameGQL,
  GetCategoriesIncomeHashNameGQL, GetCategoryGQL,
  GetTransactionsPageGQL,
  Page,
  TransactionInput,
  UpdateAccountGQL, UpdateCategoryGQL,
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
    private deleteAccountGQL: DeleteAccountGQL,
    private addCategoryGQL: AddCategoryGQL,
    private getCategoryGQL: GetCategoryGQL,
    private deleteCategoryGQL: DeleteCategoryGQL,
    private updateCategoryGQL: UpdateCategoryGQL
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

  addCategory(categoryInput: CategoryInput){
    return this.addCategoryGQL.mutate({categoryInput});
  }

  getCategory(hash: string){
    return this.getCategoryGQL.fetch({hash});
  }

  deleteCategory(hash: string) {
    return this.deleteCategoryGQL.mutate({hash});
  }

  updateCategory(hash:string, categoryUpdateInput: CategoryUpdateInput){
    return this.updateCategoryGQL.mutate({hash, categoryUpdateInput});
  }
}
