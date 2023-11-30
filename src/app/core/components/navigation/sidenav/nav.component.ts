import {Component, Input, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NavbarService} from 'src/app/core/service/navbar.service';
import {Router} from '@angular/router';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {TransactionsComponent} from "../../../../features/transactions/component/transactions/transactions.component";
import {DashboardComponent} from "../../../../features/dashboard/pages/dashboard/dashboard.component";
import {MatDialog} from "@angular/material/dialog";
import {TransactionDialogComponent} from 'src/app/shared/components/transaction-dialog/transaction-dialog.component';
import {Account, AccountType, LogicOperator} from "../../../../graphql/__generated__";
import {GraphqlService} from "../../../../graphql/service/graphql.service";
import { AccountComponent } from 'src/app/features/account/components/account/account.component';


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
  protected readonly AccountType = AccountType;
  accountsSavings: Account[];
  accountsRegular: Account[];
  balance: number = 0;


  constructor(
    private observer: BreakpointObserver,
    private navbarService: NavbarService,
    private router: Router,
    private dialog: MatDialog,
    private graphqlService: GraphqlService
  ) {
  }

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
    this.setAccounts();
  }

  goToTransactions() {
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(TransactionsComponent);
    this.router.navigate(["transactions"]);
  }

  goToDashboard() {
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(DashboardComponent);
    this.router.navigate([""]);
  }

  goToAddTransaction() {
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.dialog.open(TransactionDialogComponent);
  }

  setAccounts() {
    this.graphqlService.getAccounts({
      logicOperator: LogicOperator.And,
      accountTypeFilters: [{field: "accountType", value: AccountType.Savings}]
    }).subscribe({
      next: v => {
        this.accountsSavings = v.data.getAccounts as Account[];
        this.accountsSavings.forEach(a => this.balance += a.balance);
      },
      error: error => console.log(error)
    });
    this.graphqlService.getAccounts({
      logicOperator: LogicOperator.And,
      accountTypeFilters: [{field: "accountType", value: AccountType.Regular}]
    }).subscribe({
      next: value => {
        this.accountsRegular = value.data.getAccounts as Account[];
        this.accountsRegular.forEach(a => this.balance += a.balance)
      }
    });
  }

  goToAccount(hash: string){
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(AccountComponent);
    this.router.navigate(["account"], {queryParams: {id: hash}});
  }

  goToaddAccount() {
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(AccountComponent);
    this.router.navigate(["account"]);
  }
}
