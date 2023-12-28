import {
  GetPlannedIncomeGQL,
  AddPlannedIncomeGQL,
  PlannedIncomeInput,
  DeletePlannedIncomeGQL,
  GetIncomeExpenseGQL,
  GetExpensesPerDayOfTheWeekGQL,
  GetTopAccountsGQL,
  GetExpensesPerMonthGQL,
} from './../__generated__';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccountInput,
  AddAccountGQL,
  AddBudgetGQL,
  AddCategoryGQL,
  AddTransactionGQL,
  BudgetInput,
  CategoryInput,
  CategoryUpdateInput,
  DeleteAccountGQL,
  DeleteBudgetGQL,
  DeleteCategoryGQL,
  DeleteTransactionGQL,
  Filter,
  GetAccountGQL,
  GetAccountsGQL,
  GetAmountByCategoryGQL,
  GetBudgetsGQL,
  GetCategoriesExpenseHashNameGQL,
  GetCategoriesHashNameGQL,
  GetCategoriesIncomeHashNameGQL,
  GetCategoryGQL,
  GetTransactionsPageGQL,
  Page,
  TransactionInput,
  UpdateAccountGQL,
  UpdateBudgetGQL,
  UpdateCategoryGQL,
  UpdatePlannedIncomeGQL,
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
    private updateCategoryGQL: UpdateCategoryGQL,
    private getAmountByCategoryGQL: GetAmountByCategoryGQL,
    private getBudgetsGQL: GetBudgetsGQL,
    private addBudgetGQL: AddBudgetGQL,
    private updateBudgetGQL: UpdateBudgetGQL,
    private deleteBudgetGQL: DeleteBudgetGQL,
    private addPlannedIncomeGQL: AddPlannedIncomeGQL,
    private deletePlannedIncomeGQL: DeletePlannedIncomeGQL,
    private updatePlannedIncomeGQL: UpdatePlannedIncomeGQL,
    private getPlannedIncomeGQL: GetPlannedIncomeGQL,
    private getIncomeExpenseGQL: GetIncomeExpenseGQL,
    private getExpensesPerDayOfTheWeekGQL: GetExpensesPerDayOfTheWeekGQL,
    private getTopAccountsGQL: GetTopAccountsGQL,
    private getExpensePerMonthGQL: GetExpensesPerMonthGQL,
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

  addCategory(categoryInput: CategoryInput) {
    return this.addCategoryGQL.mutate({ categoryInput });
  }

  getCategory(hash: string) {
    return this.getCategoryGQL.fetch({ hash });
  }

  deleteCategory(hash: string) {
    return this.deleteCategoryGQL.mutate({ hash });
  }

  updateCategory(hash: string, categoryUpdateInput: CategoryUpdateInput) {
    return this.updateCategoryGQL.mutate({ hash, categoryUpdateInput });
  }

  getAmountByCategory(startDate: string, endDate: string, income: boolean) {
    return this.getAmountByCategoryGQL.fetch({ startDate, endDate, income });
  }

  getBudgets(date: string) {
    return this.getBudgetsGQL.fetch({ date });
  }

  updateBudget(plannedBudget: number, hash: string) {
    return this.updateBudgetGQL.mutate({ plannedBudget, hash });
  }

  deleteBudget(hash: string) {
    return this.deleteBudgetGQL.mutate({ hash });
  }

  addBudget(budgetInput: BudgetInput) {
    return this.addBudgetGQL.mutate({ budgetInput });
  }

  getPlannedIncome(date: string) {
    return this.getPlannedIncomeGQL.fetch({ date });
  }

  addPlannedIncome(plannedIncomeInput: PlannedIncomeInput) {
    return this.addPlannedIncomeGQL.mutate({ plannedIncomeInput });
  }

  updatePlannedIncome(hash: string, amount: number) {
    return this.updatePlannedIncomeGQL.mutate({ hash, amount });
  }

  deletePlannedIncome(hash: string) {
    return this.deletePlannedIncomeGQL.mutate({ hash });
  }

  getIncomeExpense(date: string) {
    return this.getIncomeExpenseGQL.fetch({ date });
  }

  getExpensesPerDayOfTheWeek(date: string) {
    return this.getExpensesPerDayOfTheWeekGQL.fetch({ date });
  }

  getTopAccounts() {
    return this.getTopAccountsGQL.fetch();
  }

  getExpensesPerMonth(date: string) {
    return this.getExpensePerMonthGQL.fetch({ date });
  }
}
