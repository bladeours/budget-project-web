import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

export interface TransactionElement {
  accountFrom: string;
  accountTo: String;
  amount: number;
}

const ELEMENT_DATA: TransactionElement[] = [
  {accountFrom: "esa", accountTo: "essaTo", amount: 12.2},
  {accountFrom: "esa", accountTo: "essaTo", amount: 12.2},
  {accountFrom: "esa", accountTo: "essaTo", amount: 12.2},
  {accountFrom: "es2a", accountTo: "essa2To", amount: 1.2}

];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  gridCols = 3;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    console.log("dashboard essa");
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.gridCols = 1;
      } else {
        this.gridCols = 3;
      }
    });
  }
}
