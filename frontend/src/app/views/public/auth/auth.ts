import { Component } from '@angular/core';
import { JModeToggleComponent } from '../../../tailjng/mode-toggle/mode-toggle.component';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { JInputComponent } from '../../../tailjng/input/input/input.component';
import { JButtonComponent } from '../../../tailjng/button/button.component';
import { AuthService } from '../../../infrastructure/service/auth.service';
import { JAlertDialogService } from 'tailjng';
import { Router } from '@angular/router';
import { routesArrayCommon } from '../../routes/common.routes';

@Component({
  selector: 'app-auth',
  imports: [JModeToggleComponent, ReactiveFormsModule, JInputComponent, JButtonComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {

  loginForm!: FormGroup


  constructor(
    private readonly authService: AuthService,
    private readonly alertDialog: JAlertDialogService,
    private readonly router: Router
  ) {
    this.initForm()
  }


  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('admin123', [Validators.required, Validators.minLength(8)]),
    })
  }


  onLogin() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    const { email, password } = this.loginForm.value;

    console.log('Email:', email);
    console.log('Password:', password);

    this.authService.authenticate({ email, password }).subscribe({
      next: (response) => {

        console.log('Login successful:', response);

        // localStorage.setItem('token', response.token);
        localStorage.setItem('session', 'true');

        this.router.navigate([routesArrayCommon[0]]);

      },
      error: (error) => {
        this.alertDialog.AlertDialog({
          type: 'error',
          title: error.error.message ? error.error.message : 'Hay un problema con el servidor',
          description: error.error.error ? error.error.error : 'Inténtalo de nuevo más tarde',
          onConfirm: () => { }
        })
        console.error('Error during login:', error);
      }

    })
  }


}
