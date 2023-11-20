import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { LoginComponent } from 'src/app/features/authorization/pages/auth/login/login.component';
import { DashboardComponent } from 'src/app/features/dashboard/pages/dashboard/dashboard.component';

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
      case "/lol":
        this.selectedPortal = new ComponentPortal(LoginComponent);
        break;
    }
  }
}
