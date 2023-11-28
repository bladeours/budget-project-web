import {Injectable} from '@angular/core';
import {Account, Category, Transaction, TransactionsPage, TransactionType} from "../../../graphql/__generated__";
import {TransactionCard} from "../../../shared/models/TransactionCard";
import {DatePipe} from "@angular/common";
import {myGreen, myGrey, myRed} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionCardService {

  constructor(private datePipe: DatePipe) {
  }

  getTransactionCards(transactionsPage: TransactionsPage): TransactionCard[] {
    let transactionCards: TransactionCard[] = [];
    for (let transaction of transactionsPage.content as Transaction[]) {
      transactionCards.push(this.transformToTransactionCard(transaction));
    }
    return transactionCards;
  }

  private transformToTransactionCard(transaction: Transaction): TransactionCard {
    let transactionCard: TransactionCard = new TransactionCard();
    transactionCard.hash = transaction.hash as string;
    transactionCard.date = {
      date: new Date(transaction.date as string),
      string: this.datePipe.transform(new Date(transaction.date as string), 'dd-MM-yyyy') as string
    };
    transactionCard.amount = {
      amount: transaction.transactionType == TransactionType.Expense ? (transaction.amount as number) * -1 : transaction.amount as number,
      color: this.chooseAmountColor(transaction.transactionType as TransactionType)
    };
    transactionCard.icon = "money_off";
    transactionCard.category = this.chooseCategory(transaction);
    transactionCard.subCategory = transaction.subCategory as Category;
    transactionCard.account = this.chooseAccount(transaction);
    transactionCard.type = transaction.transactionType as TransactionType;
    transactionCard.note = transaction.note as string;
    transactionCard.need = transaction.need as boolean;
    return transactionCard;
  }

  private chooseAccount(transaction: Transaction): Account {
    switch (transaction.transactionType as TransactionType) {
      case TransactionType.Expense:
        return transaction.accountFrom as Account;
      case TransactionType.Income:
        return transaction.accountTo as Account;
      case TransactionType.Transfer:
        return transaction.accountFrom as Account;
    }
  }

  private chooseCategory(transaction: Transaction): Category | Account {
    if(transaction.transactionType === TransactionType.Transfer){
      return transaction.accountTo as Account;
    }
    if(transaction.category?.parent !== null){
      return transaction.category?.parent as Category;
    }
    return transaction.category as Category;
  }

  private chooseAmountColor(transactionType: TransactionType) {
    switch (transactionType as TransactionType) {
      case TransactionType.Expense:
        return myRed;
      case TransactionType.Income:
        return myGreen;
      case TransactionType.Transfer:
        return myGrey;
    }
  }

}
