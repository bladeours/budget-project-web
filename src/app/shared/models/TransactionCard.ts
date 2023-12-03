import {Account, Category, TransactionType} from "../../graphql/__generated__";

export class TransactionCard {
  type: TransactionType;
  icon: string;
  category: Category | Account;
  subCategory: Category | undefined;
  account: Account;
  amount: {
    amount: number;
    color: string;
  };
  date: {
    date: Date;
    string: string;
  };
  hash: string;
  note: string;
  need: boolean;
}
