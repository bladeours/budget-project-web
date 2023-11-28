import {Injectable} from '@angular/core';
import {
  AddTransactionGQL,
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
  UpdateTransactionGQL
} from "../__generated__";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private getAccountGQL: GetAccountGQL,
              private getTransactionsPageGQL: GetTransactionsPageGQL,
              private getAccountsGQL: GetAccountsGQL,
              private getCategoriesIncomeHashNameGQL: GetCategoriesIncomeHashNameGQL,
              private getCategoriesExpenseHashNameGQL: GetCategoriesExpenseHashNameGQL,
              private addTransactionGQL: AddTransactionGQL,
              private updateTransactionGQL: UpdateTransactionGQL,
              private deleteTransactionGQL: DeleteTransactionGQL,
              private getCategoriesGQL: GetCategoriesHashNameGQL) { }

  getTransactionsPage(page: Page, filter: Filter): Observable<any> {
    return this.getTransactionsPageGQL.fetch({page, filter});
  }

  getAccounts(filter: Filter) {
    return this.getAccountsGQL.fetch({filter});
  }

  getCategories(){
    return this.getCategoriesGQL.fetch();
  }

  getCategoriesIncomeHashName() {
    return this.getCategoriesIncomeHashNameGQL.fetch();
  }

  getCategoriesExpenseHashName() {
    return this.getCategoriesExpenseHashNameGQL.fetch();
  }

  addTransaction(transactionInput: TransactionInput){
    return this.addTransactionGQL.mutate({transactionInput});
  }

  updateTransaction(transactionInput: TransactionInput,hash: string){
    return this.updateTransactionGQL.mutate({transactionInput, hash});
  }

  deleteTransaction(hash: string){
    return this.deleteTransactionGQL.mutate({hash});
  }
}
