import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  accountType: AccountType;
  archived: Scalars['Boolean']['output'];
  balance: Scalars['Float']['output'];
  color: Scalars['String']['output'];
  currency: Currency;
  description?: Maybe<Scalars['String']['output']>;
  hash: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Account>;
  subAccounts?: Maybe<Array<Maybe<Account>>>;
};

export type AccountInput = {
  accountType: AccountType;
  archived: Scalars['Boolean']['input'];
  balance: Scalars['Float']['input'];
  color: Scalars['String']['input'];
  currency: Currency;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentHash?: InputMaybe<Scalars['String']['input']>;
};

export enum AccountType {
  Regular = 'REGULAR',
  Savings = 'SAVINGS'
}

export type AccountTypeExpression = {
  field: Scalars['String']['input'];
  value: AccountType;
};

export type AccountsPage = {
  __typename?: 'AccountsPage';
  content?: Maybe<Array<Maybe<Account>>>;
  number?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  totalElements?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type BooleanExpression = {
  field: Scalars['String']['input'];
  value: Scalars['Boolean']['input'];
};

export type Budget = {
  __typename?: 'Budget';
  category?: Maybe<Category>;
  date?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  plannedBudget?: Maybe<Scalars['Float']['output']>;
  subCategory?: Maybe<SubCategory>;
};

export type BudgetDto = {
  __typename?: 'BudgetDto';
  budget?: Maybe<Budget>;
  left?: Maybe<Scalars['Float']['output']>;
  percent?: Maybe<Scalars['Float']['output']>;
  sum?: Maybe<Scalars['Float']['output']>;
};

export type BudgetInput = {
  categoryHash?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  plannedBudget?: InputMaybe<Scalars['Float']['input']>;
  subCategoryHash?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesPage = {
  __typename?: 'CategoriesPage';
  content?: Maybe<Array<Maybe<Category>>>;
  number?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  totalElements?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type Category = {
  __typename?: 'Category';
  archived: Scalars['Boolean']['output'];
  color: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  income: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  subCategories?: Maybe<Array<Maybe<SubCategory>>>;
};

export type CategoryAmount = {
  __typename?: 'CategoryAmount';
  amount: Scalars['Float']['output'];
  color: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  color: Scalars['String']['input'];
  income: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  subCategories?: InputMaybe<Array<InputMaybe<SubCategoryInput>>>;
};

export type CategoryUpdateInput = {
  archived: Scalars['Boolean']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subCategories?: InputMaybe<Array<InputMaybe<SubCategoryInput>>>;
};

export enum Currency {
  Eur = 'EUR',
  Pln = 'PLN'
}

export type DateExpression = {
  field: Scalars['String']['input'];
  operator: DateOperator;
  values: Array<InputMaybe<Scalars['String']['input']>>;
};

export enum DateOperator {
  Between = 'BETWEEN'
}

export type DoubleExpression = {
  field: Scalars['String']['input'];
  operator: NumberOperator;
  value: Scalars['Float']['input'];
};

export type Filter = {
  accountTypeFilters?: InputMaybe<Array<InputMaybe<AccountTypeExpression>>>;
  booleanFilters?: InputMaybe<Array<InputMaybe<BooleanExpression>>>;
  dateFilters?: InputMaybe<Array<InputMaybe<DateExpression>>>;
  doubleFilters?: InputMaybe<Array<InputMaybe<DoubleExpression>>>;
  logicOperator?: InputMaybe<LogicOperator>;
  stringFilters?: InputMaybe<Array<InputMaybe<StringExpression>>>;
  subFilters?: InputMaybe<Array<InputMaybe<Filter>>>;
};

export type JwtResponse = {
  __typename?: 'JwtResponse';
  jwt: Scalars['String']['output'];
};

export enum LogicOperator {
  And = 'AND',
  Or = 'OR'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAccount?: Maybe<Account>;
  addBudget?: Maybe<Budget>;
  addCategory?: Maybe<Category>;
  addPlannedIncome?: Maybe<PlannedIncome>;
  addTransaction?: Maybe<Transaction>;
  authenticate?: Maybe<JwtResponse>;
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteBudget?: Maybe<Scalars['Boolean']['output']>;
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  deletePlannedIncome?: Maybe<Scalars['Boolean']['output']>;
  deleteTransaction?: Maybe<Scalars['Boolean']['output']>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  refreshToken?: Maybe<JwtResponse>;
  register?: Maybe<JwtResponse>;
  updateAccount?: Maybe<Account>;
  updateBudget?: Maybe<Budget>;
  updateCategory?: Maybe<Category>;
  updatePlannedIncome?: Maybe<PlannedIncome>;
  updateTransaction?: Maybe<Transaction>;
};


export type MutationAddAccountArgs = {
  accountInput: AccountInput;
};


export type MutationAddBudgetArgs = {
  budgetInput: BudgetInput;
};


export type MutationAddCategoryArgs = {
  categoryInput: CategoryInput;
};


export type MutationAddPlannedIncomeArgs = {
  plannedIncomeInput: PlannedIncomeInput;
};


export type MutationAddTransactionArgs = {
  transactionInput: TransactionInput;
};


export type MutationAuthenticateArgs = {
  authInput: AuthInput;
};


export type MutationDeleteAccountArgs = {
  hash: Scalars['String']['input'];
  removeSub: Scalars['Boolean']['input'];
};


export type MutationDeleteBudgetArgs = {
  hash: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  hash: Scalars['String']['input'];
};


export type MutationDeletePlannedIncomeArgs = {
  hash: Scalars['String']['input'];
};


export type MutationDeleteTransactionArgs = {
  hash: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  authInput: AuthInput;
};


export type MutationUpdateAccountArgs = {
  accountInput: AccountInput;
  hash: Scalars['String']['input'];
};


export type MutationUpdateBudgetArgs = {
  hash: Scalars['String']['input'];
  plannedBudget: Scalars['Float']['input'];
};


export type MutationUpdateCategoryArgs = {
  categoryUpdateInput: CategoryUpdateInput;
  hash: Scalars['String']['input'];
};


export type MutationUpdatePlannedIncomeArgs = {
  amount: Scalars['Float']['input'];
  hash: Scalars['String']['input'];
};


export type MutationUpdateTransactionArgs = {
  hash: Scalars['String']['input'];
  transactionInput: TransactionInput;
};

export enum NumberOperator {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE'
}

export type Page = {
  number: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type PlannedIncome = {
  __typename?: 'PlannedIncome';
  amount: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  hash?: Maybe<Scalars['String']['output']>;
};

export type PlannedIncomeDto = {
  __typename?: 'PlannedIncomeDto';
  left: Scalars['Float']['output'];
  percent: Scalars['Float']['output'];
  plannedIncome: PlannedIncome;
};

export type PlannedIncomeInput = {
  amount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAccount?: Maybe<Account>;
  getAccounts?: Maybe<Array<Maybe<Account>>>;
  getAccountsPage?: Maybe<AccountsPage>;
  getAmountByCategory?: Maybe<Array<Maybe<CategoryAmount>>>;
  getBudgets?: Maybe<Array<Maybe<BudgetDto>>>;
  getCategories?: Maybe<Array<Maybe<Category>>>;
  getCategoriesPage?: Maybe<CategoriesPage>;
  getCategory?: Maybe<Category>;
  getPlannedIncome?: Maybe<PlannedIncomeDto>;
  getTransaction?: Maybe<Transaction>;
  getTransactionsPage?: Maybe<TransactionsPage>;
};


export type QueryGetAccountArgs = {
  hash: Scalars['String']['input'];
};


export type QueryGetAccountsArgs = {
  filter?: InputMaybe<Filter>;
};


export type QueryGetAccountsPageArgs = {
  filter?: InputMaybe<Filter>;
  page: Page;
};


export type QueryGetAmountByCategoryArgs = {
  endDate: Scalars['String']['input'];
  income: Scalars['Boolean']['input'];
  startDate: Scalars['String']['input'];
};


export type QueryGetBudgetsArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCategoriesArgs = {
  filter?: InputMaybe<Filter>;
};


export type QueryGetCategoriesPageArgs = {
  filter?: InputMaybe<Filter>;
  page: Page;
};


export type QueryGetCategoryArgs = {
  hash: Scalars['String']['input'];
};


export type QueryGetPlannedIncomeArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetTransactionArgs = {
  hash: Scalars['String']['input'];
};


export type QueryGetTransactionsPageArgs = {
  filter?: InputMaybe<Filter>;
  page: Page;
};

export type StringExpression = {
  field: Scalars['String']['input'];
  operator: StringOperator;
  value: Scalars['String']['input'];
};

export enum StringOperator {
  Contains = 'CONTAINS',
  Equals = 'EQUALS'
}

export type SubCategory = {
  __typename?: 'SubCategory';
  color: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
};

export type SubCategoryInput = {
  hash?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountFrom?: Maybe<Account>;
  accountTo?: Maybe<Account>;
  amount?: Maybe<Scalars['Float']['output']>;
  category?: Maybe<Category>;
  date?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  need?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  subCategory?: Maybe<SubCategory>;
  transactionType?: Maybe<TransactionType>;
};

export type TransactionInput = {
  accountFromHash?: InputMaybe<Scalars['String']['input']>;
  accountToHash?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['Float']['input'];
  categoryHash?: InputMaybe<Scalars['String']['input']>;
  currency: Currency;
  date: Scalars['String']['input'];
  name: Scalars['String']['input'];
  need: Scalars['Boolean']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  subCategoryHash?: InputMaybe<Scalars['String']['input']>;
  transactionType: TransactionType;
};

export enum TransactionType {
  Expense = 'EXPENSE',
  Income = 'INCOME',
  Transfer = 'TRANSFER'
}

export type TransactionsPage = {
  __typename?: 'TransactionsPage';
  content?: Maybe<Array<Maybe<Transaction>>>;
  number?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  totalElements?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type GetAccountQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', hash: string, color: string, balance: number, archived: boolean, name: string, description?: string | null, accountType: AccountType } | null };

export type AuthenticateMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate?: { __typename?: 'JwtResponse', jwt: string } | null };

export type RegisterMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'JwtResponse', jwt: string } | null };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'JwtResponse', jwt: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type GetAccountsPageQueryVariables = Exact<{
  page: Page;
  filter?: InputMaybe<Filter>;
}>;


export type GetAccountsPageQuery = { __typename?: 'Query', getAccountsPage?: { __typename?: 'AccountsPage', size?: number | null, number?: number | null, totalElements?: number | null, totalPages?: number | null, content?: Array<{ __typename?: 'Account', hash: string, color: string, name: string, archived: boolean, balance: number, accountType: AccountType } | null> | null } | null };

export type GetTransactionsPageQueryVariables = Exact<{
  page: Page;
  filter?: InputMaybe<Filter>;
}>;


export type GetTransactionsPageQuery = { __typename?: 'Query', getTransactionsPage?: { __typename?: 'TransactionsPage', size?: number | null, number?: number | null, totalElements?: number | null, totalPages?: number | null, content?: Array<{ __typename?: 'Transaction', transactionType?: TransactionType | null, hash?: string | null, name?: string | null, amount?: number | null, date?: string | null, need?: boolean | null, note?: string | null, accountFrom?: { __typename?: 'Account', hash: string, name: string } | null, accountTo?: { __typename?: 'Account', hash: string, name: string } | null, category?: { __typename?: 'Category', name: string, color: string, hash: string, income: boolean, subCategories?: Array<{ __typename?: 'SubCategory', name: string, hash: string } | null> | null } | null, subCategory?: { __typename?: 'SubCategory', hash: string, name: string } | null } | null> | null } | null };

export type GetAccountsQueryVariables = Exact<{
  filter?: InputMaybe<Filter>;
}>;


export type GetAccountsQuery = { __typename?: 'Query', getAccounts?: Array<{ __typename?: 'Account', hash: string, name: string, archived: boolean, balance: number, color: string } | null> | null };

export type GetCategoriesIncomeHashNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesIncomeHashNameQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', hash: string, name: string, archived: boolean, color: string, subCategories?: Array<{ __typename?: 'SubCategory', name: string, hash: string } | null> | null } | null> | null };

export type GetCategoriesExpenseHashNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesExpenseHashNameQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', hash: string, name: string, archived: boolean, color: string, subCategories?: Array<{ __typename?: 'SubCategory', name: string, hash: string } | null> | null } | null> | null };

export type GetCategoriesHashNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesHashNameQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', hash: string, name: string, archived: boolean, income: boolean, color: string, subCategories?: Array<{ __typename?: 'SubCategory', name: string, hash: string } | null> | null } | null> | null };

export type AddTransactionMutationVariables = Exact<{
  transactionInput: TransactionInput;
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction?: { __typename?: 'Transaction', hash?: string | null, name?: string | null } | null };

export type UpdateTransactionMutationVariables = Exact<{
  transactionInput: TransactionInput;
  hash: Scalars['String']['input'];
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction?: { __typename?: 'Transaction', hash?: string | null, name?: string | null } | null };

export type DeleteTransactionMutationVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction?: boolean | null };

export type UpdateAccountMutationVariables = Exact<{
  hash: Scalars['String']['input'];
  accountInput: AccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount?: { __typename?: 'Account', hash: string } | null };

export type AddAccountMutationVariables = Exact<{
  accountInput: AccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount?: { __typename?: 'Account', hash: string } | null };

export type DeleteAccountMutationVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount?: boolean | null };

export type AddCategoryMutationVariables = Exact<{
  categoryInput: CategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory?: { __typename?: 'Category', hash: string } | null };

export type GetCategoryQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', hash: string, name: string, income: boolean, archived: boolean, color: string, subCategories?: Array<{ __typename?: 'SubCategory', name: string, hash: string } | null> | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: boolean | null };

export type UpdateCategoryMutationVariables = Exact<{
  hash: Scalars['String']['input'];
  categoryUpdateInput: CategoryUpdateInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', hash: string } | null };

export type GetAmountByCategoryQueryVariables = Exact<{
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  income: Scalars['Boolean']['input'];
}>;


export type GetAmountByCategoryQuery = { __typename?: 'Query', getAmountByCategory?: Array<{ __typename?: 'CategoryAmount', name: string, amount: number, color: string } | null> | null };

export type GetBudgetsQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetBudgetsQuery = { __typename?: 'Query', getBudgets?: Array<{ __typename?: 'BudgetDto', percent?: number | null, left?: number | null, budget?: { __typename?: 'Budget', plannedBudget?: number | null, hash?: string | null, category?: { __typename?: 'Category', color: string, name: string, hash: string } | null } | null } | null> | null };

export type AddBudgetMutationVariables = Exact<{
  budgetInput: BudgetInput;
}>;


export type AddBudgetMutation = { __typename?: 'Mutation', addBudget?: { __typename?: 'Budget', hash?: string | null } | null };

export type UpdateBudgetMutationVariables = Exact<{
  plannedBudget: Scalars['Float']['input'];
  hash: Scalars['String']['input'];
}>;


export type UpdateBudgetMutation = { __typename?: 'Mutation', updateBudget?: { __typename?: 'Budget', hash?: string | null } | null };

export type DeleteBudgetMutationVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type DeleteBudgetMutation = { __typename?: 'Mutation', deleteBudget?: boolean | null };

export type GetPlannedIncomeQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetPlannedIncomeQuery = { __typename?: 'Query', getPlannedIncome?: { __typename?: 'PlannedIncomeDto', left: number, percent: number, plannedIncome: { __typename?: 'PlannedIncome', hash?: string | null, date: string, amount: number } } | null };

export type AddPlannedIncomeMutationVariables = Exact<{
  plannedIncomeInput: PlannedIncomeInput;
}>;


export type AddPlannedIncomeMutation = { __typename?: 'Mutation', addPlannedIncome?: { __typename?: 'PlannedIncome', hash?: string | null } | null };

export type UpdatePlannedIncomeMutationVariables = Exact<{
  hash: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type UpdatePlannedIncomeMutation = { __typename?: 'Mutation', updatePlannedIncome?: { __typename?: 'PlannedIncome', hash?: string | null } | null };

export type DeletePlannedIncomeMutationVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type DeletePlannedIncomeMutation = { __typename?: 'Mutation', deletePlannedIncome?: boolean | null };

export const GetAccountDocument = gql`
    query getAccount($hash: String!) {
  getAccount(hash: $hash) {
    hash
    color
    balance
    archived
    name
    description
    accountType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAccountGQL extends Apollo.Query<GetAccountQuery, GetAccountQueryVariables> {
    override document = GetAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthenticateDocument = gql`
    mutation authenticate($authInput: AuthInput!) {
  authenticate(authInput: $authInput) {
    jwt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticateGQL extends Apollo.Mutation<AuthenticateMutation, AuthenticateMutationVariables> {
    override document = AuthenticateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation register($authInput: AuthInput!) {
  register(authInput: $authInput) {
    jwt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    override document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RefreshTokenDocument = gql`
    mutation refreshToken {
  refreshToken {
    jwt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshTokenGQL extends Apollo.Mutation<RefreshTokenMutation, RefreshTokenMutationVariables> {
    override document = RefreshTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    override document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAccountsPageDocument = gql`
    query getAccountsPage($page: Page!, $filter: Filter) {
  getAccountsPage(page: $page, filter: $filter) {
    size
    number
    totalElements
    totalPages
    content {
      hash
      color
      name
      archived
      balance
      accountType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAccountsPageGQL extends Apollo.Query<GetAccountsPageQuery, GetAccountsPageQueryVariables> {
    override document = GetAccountsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTransactionsPageDocument = gql`
    query getTransactionsPage($page: Page!, $filter: Filter) {
  getTransactionsPage(page: $page, filter: $filter) {
    size
    number
    totalElements
    totalPages
    content {
      transactionType
      hash
      name
      amount
      accountFrom {
        hash
        name
      }
      accountTo {
        hash
        name
      }
      category {
        name
        color
        hash
        income
        subCategories {
          name
          hash
        }
      }
      subCategory {
        hash
        name
      }
      date
      need
      note
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTransactionsPageGQL extends Apollo.Query<GetTransactionsPageQuery, GetTransactionsPageQueryVariables> {
    override document = GetTransactionsPageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAccountsDocument = gql`
    query getAccounts($filter: Filter) {
  getAccounts(filter: $filter) {
    hash
    name
    archived
    balance
    color
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAccountsGQL extends Apollo.Query<GetAccountsQuery, GetAccountsQueryVariables> {
    override document = GetAccountsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCategoriesIncomeHashNameDocument = gql`
    query getCategoriesIncomeHashName {
  getCategories(
    filter: {booleanFilters: [{field: "income", value: true}], logicOperator: AND}
  ) {
    hash
    name
    archived
    color
    subCategories {
      name
      hash
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoriesIncomeHashNameGQL extends Apollo.Query<GetCategoriesIncomeHashNameQuery, GetCategoriesIncomeHashNameQueryVariables> {
    override document = GetCategoriesIncomeHashNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCategoriesExpenseHashNameDocument = gql`
    query getCategoriesExpenseHashName {
  getCategories(
    filter: {booleanFilters: [{field: "income", value: false}], logicOperator: AND}
  ) {
    hash
    name
    archived
    color
    subCategories {
      name
      hash
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoriesExpenseHashNameGQL extends Apollo.Query<GetCategoriesExpenseHashNameQuery, GetCategoriesExpenseHashNameQueryVariables> {
    override document = GetCategoriesExpenseHashNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCategoriesHashNameDocument = gql`
    query getCategoriesHashName {
  getCategories {
    hash
    name
    archived
    income
    color
    subCategories {
      name
      hash
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoriesHashNameGQL extends Apollo.Query<GetCategoriesHashNameQuery, GetCategoriesHashNameQueryVariables> {
    override document = GetCategoriesHashNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddTransactionDocument = gql`
    mutation addTransaction($transactionInput: TransactionInput!) {
  addTransaction(transactionInput: $transactionInput) {
    hash
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddTransactionGQL extends Apollo.Mutation<AddTransactionMutation, AddTransactionMutationVariables> {
    override document = AddTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTransactionDocument = gql`
    mutation updateTransaction($transactionInput: TransactionInput!, $hash: String!) {
  updateTransaction(transactionInput: $transactionInput, hash: $hash) {
    hash
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTransactionGQL extends Apollo.Mutation<UpdateTransactionMutation, UpdateTransactionMutationVariables> {
    override document = UpdateTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTransactionDocument = gql`
    mutation deleteTransaction($hash: String!) {
  deleteTransaction(hash: $hash)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTransactionGQL extends Apollo.Mutation<DeleteTransactionMutation, DeleteTransactionMutationVariables> {
    override document = DeleteTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAccountDocument = gql`
    mutation updateAccount($hash: String!, $accountInput: AccountInput!) {
  updateAccount(hash: $hash, accountInput: $accountInput) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAccountGQL extends Apollo.Mutation<UpdateAccountMutation, UpdateAccountMutationVariables> {
    override document = UpdateAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddAccountDocument = gql`
    mutation addAccount($accountInput: AccountInput!) {
  addAccount(accountInput: $accountInput) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddAccountGQL extends Apollo.Mutation<AddAccountMutation, AddAccountMutationVariables> {
    override document = AddAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAccountDocument = gql`
    mutation deleteAccount($hash: String!) {
  deleteAccount(hash: $hash, removeSub: false)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAccountGQL extends Apollo.Mutation<DeleteAccountMutation, DeleteAccountMutationVariables> {
    override document = DeleteAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddCategoryDocument = gql`
    mutation addCategory($categoryInput: CategoryInput!) {
  addCategory(categoryInput: $categoryInput) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddCategoryGQL extends Apollo.Mutation<AddCategoryMutation, AddCategoryMutationVariables> {
    override document = AddCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCategoryDocument = gql`
    query getCategory($hash: String!) {
  getCategory(hash: $hash) {
    hash
    name
    income
    subCategories {
      name
      hash
    }
    archived
    color
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoryGQL extends Apollo.Query<GetCategoryQuery, GetCategoryQueryVariables> {
    override document = GetCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($hash: String!) {
  deleteCategory(hash: $hash)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCategoryGQL extends Apollo.Mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables> {
    override document = DeleteCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCategoryDocument = gql`
    mutation updateCategory($hash: String!, $categoryUpdateInput: CategoryUpdateInput!) {
  updateCategory(hash: $hash, categoryUpdateInput: $categoryUpdateInput) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCategoryGQL extends Apollo.Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> {
    override document = UpdateCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAmountByCategoryDocument = gql`
    query getAmountByCategory($startDate: String!, $endDate: String!, $income: Boolean!) {
  getAmountByCategory(income: $income, startDate: $startDate, endDate: $endDate) {
    name
    amount
    color
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAmountByCategoryGQL extends Apollo.Query<GetAmountByCategoryQuery, GetAmountByCategoryQueryVariables> {
    override document = GetAmountByCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetBudgetsDocument = gql`
    query getBudgets($date: String!) {
  getBudgets(date: $date) {
    percent
    left
    budget {
      plannedBudget
      hash
      category {
        color
        name
        hash
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBudgetsGQL extends Apollo.Query<GetBudgetsQuery, GetBudgetsQueryVariables> {
    override document = GetBudgetsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddBudgetDocument = gql`
    mutation addBudget($budgetInput: BudgetInput!) {
  addBudget(budgetInput: $budgetInput) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddBudgetGQL extends Apollo.Mutation<AddBudgetMutation, AddBudgetMutationVariables> {
    override document = AddBudgetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateBudgetDocument = gql`
    mutation updateBudget($plannedBudget: Float!, $hash: String!) {
  updateBudget(plannedBudget: $plannedBudget, hash: $hash) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBudgetGQL extends Apollo.Mutation<UpdateBudgetMutation, UpdateBudgetMutationVariables> {
    override document = UpdateBudgetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteBudgetDocument = gql`
    mutation deleteBudget($hash: String!) {
  deleteBudget(hash: $hash)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBudgetGQL extends Apollo.Mutation<DeleteBudgetMutation, DeleteBudgetMutationVariables> {
    override document = DeleteBudgetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPlannedIncomeDocument = gql`
    query getPlannedIncome($date: String!) {
  getPlannedIncome(date: $date) {
    left
    percent
    plannedIncome {
      hash
      date
      amount
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPlannedIncomeGQL extends Apollo.Query<GetPlannedIncomeQuery, GetPlannedIncomeQueryVariables> {
    override document = GetPlannedIncomeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddPlannedIncomeDocument = gql`
    mutation addPlannedIncome($plannedIncomeInput: PlannedIncomeInput!) {
  addPlannedIncome(plannedIncomeInput: $plannedIncomeInput) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddPlannedIncomeGQL extends Apollo.Mutation<AddPlannedIncomeMutation, AddPlannedIncomeMutationVariables> {
    override document = AddPlannedIncomeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePlannedIncomeDocument = gql`
    mutation updatePlannedIncome($hash: String!, $amount: Float!) {
  updatePlannedIncome(hash: $hash, amount: $amount) {
    hash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePlannedIncomeGQL extends Apollo.Mutation<UpdatePlannedIncomeMutation, UpdatePlannedIncomeMutationVariables> {
    override document = UpdatePlannedIncomeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePlannedIncomeDocument = gql`
    mutation deletePlannedIncome($hash: String!) {
  deletePlannedIncome(hash: $hash)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePlannedIncomeGQL extends Apollo.Mutation<DeletePlannedIncomeMutation, DeletePlannedIncomeMutationVariables> {
    override document = DeletePlannedIncomeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }