import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatSnackBarService } from '../../../../shared/service/mat-snack-bar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private matSnackBarService: MatSnackBarService,
  ) {}

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem(AuthService.accessTokenKey);
        this.matSnackBarService
          .open('Logout properly')
          .afterDismissed()
          .subscribe(() => this.router.navigate(['login']));
      },
      error: (error) => alert(error),
    });
  }
}
