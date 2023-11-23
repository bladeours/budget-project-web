import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Component} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {NavbarService} from 'src/app/core/service/navbar.service';
import {DashboardComponent} from 'src/app/features/dashboard/pages/dashboard/dashboard.component';
import {TransactionsComponent} from "../../../../features/transactions/pages/transactions/transactions.component";

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
    switch(String(this.router.url)) {
      case "/":
        this.selectedPortal = new ComponentPortal(DashboardComponent);
        break;
      case "/transactions":
        this.selectedPortal = new ComponentPortal(TransactionsComponent);
        break;
    }
  }
}
