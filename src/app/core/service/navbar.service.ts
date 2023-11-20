import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private sidenav: MatSidenav;
  constructor() {}
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public getSidenav(): MatSidenav {
    return this.sidenav;
  }

}
