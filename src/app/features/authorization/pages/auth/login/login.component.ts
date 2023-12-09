import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInput } from '../../../models/AuthInput';
import { AuthService } from '../../../service/auth.service';
import { MatSnackBarService } from '../../../../../shared/service/mat-snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private matSnackBarService: MatSnackBarService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router
        .navigate([''])
        .then(() => this.matSnackBarService.open('you are already logged'));
    }
  }

  login() {
    if (this.formGroup.valid) {
      this.authService
        .login(this.formGroup.value as AuthInput)
        .subscribe((response) => {
          this.authService.setAuth(response.data.authenticate.jwt);
          this.router.navigate(['']);
        });
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
