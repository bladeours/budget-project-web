import {Injectable} from '@angular/core';
import {Transaction, TransactionsPage, TransactionType} from "../../../graphql/__generated__";
import {TransactionCard} from "../../../shared/models/TransactionCard";
import {DatePipe} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

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
        transactionCard.date = transaction.date as string;
        transactionCard.date = this.datePipe.transform(transactionCard.date, 'dd-MM-yyyy') as string;
        console.log(transaction.amount);
        transactionCard.amount = {
            amount: transaction.transactionType == TransactionType.Expense ? (transaction.amount as number) * -1 : transaction.amount as number ,
            color: this.chooseAmountColor(transaction.transactionType as TransactionType)
        };
        transactionCard.icon = "money_off";
        transactionCard.category = this.chooseCategory(transaction);
        transactionCard.account = this.chooseAccount(transaction);
        return transactionCard;
    }

    private chooseAccount(transaction: Transaction): string {
        switch (transaction.transactionType as TransactionType) {
            case TransactionType.Expense:
                return transaction.accountFrom?.name as string;
            case TransactionType.Income:
                return transaction.accountTo?.name as string;
            case TransactionType.Transfer:
                return transaction.accountFrom?.name as string;
        }
    }

    private chooseCategory(transaction: Transaction): string {
        switch (transaction.transactionType as TransactionType) {
            case TransactionType.Expense:
                return transaction.category?.name as string;
            case TransactionType.Income:
                return transaction.category?.name as string;
            case TransactionType.Transfer:
                return transaction.accountTo?.name as string;
        }
    }

    private chooseAmountColor(transactionType: TransactionType) {
        switch (transactionType as TransactionType) {
            case TransactionType.Expense:
                return "#FF6961";
            case TransactionType.Income:
                return "#77DD77";
            case TransactionType.Transfer:
                return "#BFBFBF";
        }
    }

}
