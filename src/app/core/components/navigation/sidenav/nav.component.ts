import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { Router } from '@angular/router';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {TransactionsComponent} from "../../../../features/transactions/pages/transactions/transactions.component";
import {DashboardComponent} from "../../../../features/dashboard/pages/dashboard/dashboard.component";
import {MatDialog} from "@angular/material/dialog";
import { TransactionDialogComponent } from 'src/app/shared/components/transaction-dialog/transaction-dialog.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavbarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  path: string;
  @Input()
  selectedPortal: Portal<any>;
  isSmall: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private navbarService: NavbarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.path = this.router.url;
    this.navbarService.setSidenav(this.sidenav);
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.isSmall = true;
        this.sidenav.mode = 'over';
        this.sidenav.close();
        // this.sidenav.
      } else {
        this.isSmall = false;
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  goToTransactions() {
    if(this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(TransactionsComponent);
    this.router.navigate(["transactions"]);
  }

  goToDashboard() {
    if(this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(DashboardComponent);
    this.router.navigate([""]);
  }

  addTransaction() {
    if(this.isSmall) {
      this.sidenav.close();
    }
    this.dialog.open(TransactionDialogComponent);
    }
}
