import { Component, Input } from '@angular/core';
import { TransactionCard } from '../../../../shared/models/TransactionCard';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../../dialog/transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent {
  @Input()
  transactionCard: TransactionCard;

  constructor(private dialog: MatDialog) {}

  handleClick() {
    this.dialog.open(TransactionDialogComponent, {
      data: this.transactionCard,
    });
  }
}
