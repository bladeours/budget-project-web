import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TransactionCard } from '../../../../shared/models/TransactionCard';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../../dialog/transaction-dialog/transaction-dialog.component';
import { Utils } from '../../../../shared/utils/Utils';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  @Input()
  transactionCard: TransactionCard;
  @HostBinding('style.opacity')
  opacity = 1;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.transactionCard.date.date > new Date()) {
      this.opacity = 0.5;
    }
  }

  handleClick() {
    this.dialog.open(TransactionDialogComponent, {
      data: this.transactionCard,
    });
  }
}
