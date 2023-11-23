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
  color?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  income?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['Int']['output']>;
};

export type CategoryInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  color: Scalars['String']['input'];
  income: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  parentHash?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdateInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
  addCategory?: Maybe<Category>;
  addTransaction?: Maybe<Transaction>;
  authenticate?: Maybe<JwtResponse>;
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteTransaction?: Maybe<Scalars['Boolean']['output']>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  refreshToken?: Maybe<JwtResponse>;
  register?: Maybe<JwtResponse>;
  updateAccount?: Maybe<Account>;
  updateCategory?: Maybe<Category>;
  updateTransaction?: Maybe<Transaction>;
};


export type MutationAddAccountArgs = {
  accountInput: AccountInput;
};


export type MutationAddCategoryArgs = {
  categoryInput: CategoryInput;
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


export type MutationDeleteCategoryArgs = {
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


export type MutationUpdateCategoryArgs = {
  categoryUpdateInput: CategoryUpdateInput;
  hash: Scalars['String']['input'];
};


export type MutationUpdateTransactionArgs = {
  hash: Scalars['String']['input'];
  transactionUpdateInput: TransactionUpdateInput;
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

export type Query = {
  __typename?: 'Query';
  getAccount?: Maybe<Account>;
  getAccountsPage?: Maybe<AccountsPage>;
  getCategoriesPage?: Maybe<CategoriesPage>;
  getCategory?: Maybe<Category>;
  getTransaction?: Maybe<Transaction>;
  getTransactionsPage?: Maybe<TransactionsPage>;
};


export type QueryGetAccountArgs = {
  hash: Scalars['String']['input'];
};


export type QueryGetAccountsPageArgs = {
  filter?: InputMaybe<Filter>;
  page: Page;
};


export type QueryGetCategoriesPageArgs = {
  filter?: InputMaybe<Filter>;
  page: Page;
};


export type QueryGetCategoryArgs = {
  hash: Scalars['String']['input'];
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
  transactionType: TransactionType;
};

export enum TransactionType {
  Expense = 'EXPENSE',
  Income = 'INCOME',
  Transfer = 'TRANSFER'
}

export type TransactionUpdateInput = {
  accountFromHash?: InputMaybe<Scalars['String']['input']>;
  accountToHash?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['Float']['input'];
  categoryHash?: InputMaybe<Scalars['String']['input']>;
  currency: Currency;
  date: Scalars['String']['input'];
  name: Scalars['String']['input'];
  need: Scalars['Boolean']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

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


export type GetAccountQuery = { __typename?: 'Query', getAccount?: { __typename?: 'Account', hash: string, color: string } | null };

export type AuthenticateMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate?: { __typename?: 'JwtResponse', jwt: string } | null };

export const GetAccountDocument = gql`
    query getAccount($hash: String!) {
  getAccount(hash: $hash) {
    hash
    color
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