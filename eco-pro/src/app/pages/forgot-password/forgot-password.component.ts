import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ,RouterLink ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  step = 1;

  verifyEmail : FormGroup= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  verifyCode:FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]) // خليت الكود 6 أرقام بدل 9
  });

  resetPassword :FormGroup= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  verifyEmailSubmit(): void {
    this.authService.setEmailVerfiy(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {console.log(err)}
    });
  }

  verifyCodeSubmit(): void {
    this.authService.setCodeVerfiy(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) =>
        {console.log(err)}
    });
  }

  resetPasswordSubmit(): void {
    this.authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
this.authService.getUserData()
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err)
    }})
  }
}
