import {Component, Input, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NavbarService} from 'src/app/core/service/navbar.service';
import {Router} from '@angular/router';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {TransactionsComponent} from "../../../../features/transactions/component/transactions/transactions.component";
import {DashboardComponent} from "../../../../features/dashboard/pages/dashboard/dashboard.component";
import {MatDialog} from "@angular/material/dialog";
import {TransactionDialogComponent} from 'src/app/shared/components/dialogs/transaction-dialog/transaction-dialog.component';
import {Account, AccountType, Category, LogicOperator} from "../../../../graphql/__generated__";
import {GraphqlService} from "../../../../graphql/service/graphql.service";
import { AccountComponent } from 'src/app/features/account/components/account/account.component';
import {CategoryComponent} from "../../../../features/category/components/category/category.component";
import {AccountDialogComponent} from "../../../../shared/components/dialogs/account-dialog/account-dialog.component";
import {CategoryDialogComponent} from "../../../../shared/components/dialogs/category-dialog/category-dialog.component";


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
  accountsSavingsArchived: Account[] = [];
  accountsRegular: Account[];
  accountsRegularArchived: Account[] = [];
  categoryIncome: Category[];
  categoryArchivedIncome: Category[] = [];
  categoryExpense: Category[];
  categoryArchivedExpense: Category[] = [];
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
    this.setCategories();
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
        this.accountsSavings = (v.data.getAccounts as Account[]).filter(a => !a.archived);
        this.accountsSavingsArchived = (v.data.getAccounts as Account[]).filter(a => a.archived);
        this.accountsSavings.forEach(a => this.balance += a.balance);
      },
      error: error => console.log(error)
    });
    this.graphqlService.getAccounts({
      logicOperator: LogicOperator.And,
      accountTypeFilters: [{field: "accountType", value: AccountType.Regular}]
    }).subscribe({
      next: v => {
        this.accountsRegular = (v.data.getAccounts as Account[]).filter(a => !a.archived);
        this.accountsRegularArchived = (v.data.getAccounts as Account[]).filter(a => a.archived);
        this.accountsRegular.forEach(a => this.balance += a.balance)
      }
    });
  }


  setCategories() {
    this.graphqlService.getCategoriesIncomeHashName().subscribe({
      next: v => {
        this.categoryIncome = (v.data.getCategories as Category[]).filter(c => !c.archived);
        this.categoryArchivedIncome = (v.data.getCategories as Category[]).filter(c => c.archived);
      },
      error: error => console.log(error)
    });
    this.graphqlService.getCategoriesExpenseHashName().subscribe({
      next: value => {
        this.categoryExpense = (value.data.getCategories as Category[]).filter(c => !c.archived);
        this.categoryArchivedExpense = (value.data.getCategories as Category[]).filter(c => c.archived);
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

  goToAddAccount() {
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.dialog.open(AccountDialogComponent);
  }

  goToCategory(hash: string){
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.selectedPortal = new ComponentPortal(CategoryComponent);
    this.router.navigate(["category"], {queryParams: {id: hash}});
  }

  goToAddCategory() {
    if (this.isSmall) {
      this.sidenav.close();
    }
    this.dialog.open(CategoryDialogComponent);
  }
}
