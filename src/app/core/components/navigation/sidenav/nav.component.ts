import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { Router } from '@angular/router';
import { Portal } from '@angular/cdk/portal';


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

  constructor(
    private observer: BreakpointObserver,
    private navbarService: NavbarService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.path = this.router.url;
    this.navbarService.setSidenav(this.sidenav);
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        // this.sidenav.
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
