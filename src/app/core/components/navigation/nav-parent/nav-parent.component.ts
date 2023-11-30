import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Component} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {NavbarService} from 'src/app/core/service/navbar.service';
import {DashboardComponent} from 'src/app/features/dashboard/pages/dashboard/dashboard.component';
import {TransactionsComponent} from "../../../../features/transactions/component/transactions/transactions.component";
import {AccountComponent} from "../../../../features/account/components/account/account.component";

@Component({
  selector: 'app-nav-parent',
  templateUrl: './nav-parent.component.html',
  styleUrls: ['./nav-parent.component.scss']
})
export class NavParentComponent {
  matSidenav: MatSidenav;
  selectedPortal: Portal<any>;
  constructor(private navbarService: NavbarService, private router: Router){}

  ngAfterViewInit(){
    this.matSidenav = this.navbarService.getSidenav();
    switch(this.getUrlWithoutParams()) {
      case "/":
        this.selectedPortal = new ComponentPortal(DashboardComponent);
        break;
      case "/transactions":
        this.selectedPortal = new ComponentPortal(TransactionsComponent);
        break;
      case "/account":
        this.selectedPortal = new ComponentPortal(AccountComponent);
        break;
    }
  }

  getUrlWithoutParams(){
    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    urlTree.fragment = null; // optional
    return urlTree.toString();
  }
}
