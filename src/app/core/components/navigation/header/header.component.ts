import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  matSidenav: MatSidenav;

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['logout']);
  }
}
