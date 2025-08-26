import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormValidationUtils } from '@utils/form-validation-utils';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);
  formValidationUtils = FormValidationUtils;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {username, password} = this.form.value;
    this.authService.login(username!, password!).subscribe({
      next: isAuthenticated => {
        if(isAuthenticated) {
          this.router.navigateByUrl('/');
          return;
        }
        this.hasError.set(true);
      },
      error: (err) => console.log(err)

    });
  }

}
