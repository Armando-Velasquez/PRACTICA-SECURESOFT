import { AfterViewInit, Component, NgZone } from '@angular/core';
import { JModeToggleComponent } from '../../../tailjng/mode-toggle/mode-toggle.component';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { JInputComponent } from '../../../tailjng/input/input/input.component';
import { JButtonComponent } from '../../../tailjng/button/button.component';
import { AuthService } from '../../../infrastructure/service/auth.service';
import { JAlertDialogService } from 'tailjng';
import { Router } from '@angular/router';
import { routesArrayCommon } from '../../routes/common.routes';
import { MfaService } from '../../../infrastructure/service/mfa.service';
import { environment } from '../../../../enviroment';

@Component({
  selector: 'app-auth',
  imports: [JModeToggleComponent, ReactiveFormsModule, JInputComponent, JButtonComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent implements AfterViewInit {

  loginForm!: FormGroup

  showMfa: boolean = false;
  mfaUserId!: number;

  mfaForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly mfaService: MfaService,
    private readonly alertDialog: JAlertDialogService,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {
    this.initForm()
  }


  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('josue27.velasquez9@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Admin123@', [Validators.required, Validators.minLength(8)]),
    })

    this.mfaForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]+$')
      ])
    })

  }

  ngAfterViewInit() {
    this.loadGoogleButton()
  }

  loadGoogleButton() {

    if ((window as any).google?.accounts?.id) {

      (window as any).google.accounts.id.initialize({
        client_id: environment.CLIENT_ID,
        callback: (response: any) => {

          this.ngZone.run(() => {

            console.log('GOOGLE RESPONSE:', response);

            this.authService.googleLogin(response.credential).subscribe({
              next: (response) => {

                console.log('Login exitoso:', response);

                if (response.message === 'MFA requerido') {
                  this.showMfa = true;           // 👈 abre overlay
                  this.mfaUserId = response.id_user;  // 👈 guarda el id del usuario para la verificación
                  return;
                }

                localStorage.setItem('session', 'true');

                // window.location.href = routesArrayCommon[0];  // Inicio
                setTimeout(() => {
                  this.router.navigate([routesArrayCommon[0]]);
                }, 100);


              },
              error: (error) => {
                this.alertDialog.AlertDialog({
                  type: 'info',
                  title: error.error.message ? 'Credenciales incorrectas' : 'Problema detectado',
                  description: error.error.error ?? 'Hubo un problema al procesar su solicitud. Intente nuevamente más tarde.',
                  onConfirm: () => { console.log('ok') }
                });
                console.error('Error en la solicitud:', error);
              }
            });

          });

        }
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",
          size: "large"
        }
      );

    }


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

        if (response.message === 'MFA requerido') {
          this.showMfa = true;
          this.mfaUserId = response.id_user;
          return;
        }

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



  onMfaSubmit() {
    if (this.mfaForm.invalid) {
      this.mfaForm.markAllAsTouched();
      return;
    }

    const { code } = this.mfaForm.value;

    this.mfaService.verify(this.mfaUserId, code).subscribe({
      next: (response) => {
        console.log('MFA verification successful:', response);

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
        console.error('Error during MFA verification:', error);
      }

    })


  }


}
