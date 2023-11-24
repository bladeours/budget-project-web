import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [CommonModule,  MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    CurrencyMaskModule],
  templateUrl: './add-transaction-dialog.component.html',
  styleUrl: './add-transaction-dialog.component.scss'
})
export class AddTransactionDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddTransactionDialogComponent>){}

  saveTransaction(): void {
    console.log("saving...");
    this.dialogRef.close();
  }

}
