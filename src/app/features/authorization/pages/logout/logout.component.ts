import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../service/auth.service';
import {AuthInput} from "../../models/AuthInput";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.authService.logout()
      .subscribe({
        next: (response) => {
          console.log("essa");
          localStorage.removeItem(AuthService.accessTokenKey);
          this.matSnackBar.open("Logout properly", "close", {
            duration: 3000
          });
          this.router.navigate(["login"]);
        },
        error: (error) => alert(error),
      });
  }
}
