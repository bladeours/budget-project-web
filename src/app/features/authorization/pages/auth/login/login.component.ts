import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginForm} from '../../../models/LoginForm';
import {AuthService} from '../../../service/auth.service';

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      alert('you are already logged');
      this.router.navigate(['']);
    }
  }

  login() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value as LoginForm).subscribe({
        next: (response) => {
          this.authService.setAuth(response);
          this.router.navigate(['']);
        },
        error: (error) => alert(error.error.message),
      });
    }
  }
}
