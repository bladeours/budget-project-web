import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { DashboardComponent } from 'src/app/features/dashboard/pages/dashboard/dashboard.component';
import { TransactionsComponent } from '../../../../features/transactions/component/transactions/transactions.component';
import { AccountComponent } from '../../../../features/account/components/account/account.component';
import { CategoryComponent } from '../../../../features/category/components/category/category.component';
import { StatisticsComponent } from '../../../../features/statistics/pages/statistics.component';
import { BudgetComponent } from 'src/app/features/budget/components/budget/budget.component';

@Component({
  selector: 'app-nav-parent',
  templateUrl: './nav-parent.component.html',
  styleUrls: ['./nav-parent.component.scss'],
})
export class NavParentComponent {
  matSidenav: MatSidenav;
  selectedPortal: Portal<any>;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    this.matSidenav = this.navbarService.getSidenav();
    switch (this.getUrlWithoutParams()) {
      case '/':
        this.selectedPortal = new ComponentPortal(DashboardComponent);
        break;
      case '/transactions':
        this.selectedPortal = new ComponentPortal(TransactionsComponent);
        break;
      case '/account':
        this.selectedPortal = new ComponentPortal(AccountComponent);
        break;
      case '/category':
        this.selectedPortal = new ComponentPortal(CategoryComponent);
        break;
      case '/statistics':
        this.selectedPortal = new ComponentPortal(StatisticsComponent);
        break;
      case '/budget':
        this.selectedPortal = new ComponentPortal(BudgetComponent);
        break;
    }
  }

  getUrlWithoutParams() {
    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    urlTree.fragment = null;
    return urlTree.toString();
  }
}
