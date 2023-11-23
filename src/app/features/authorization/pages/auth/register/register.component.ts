import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {AuthInput} from "../../../models/AuthInput";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  register() {
    if (this.formGroup.valid) {
      this.authService
        .register(this.formGroup.value as AuthInput)
        .subscribe({
          next: (response) => {
            this.authService.setAuth(response.data.register.jwt);
            this.router.navigate(['']);
          },
          error: (error) => alert(error),
        });
    }
  }
}
