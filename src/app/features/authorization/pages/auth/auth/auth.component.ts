import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  activeTab: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/register') {
      this.activeTab = 1;
    } else {
      this.activeTab = 0;
    }
  }
}
