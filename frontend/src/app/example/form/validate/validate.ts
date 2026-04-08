import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { JInputComponent } from '../../../tailjng/input/input/input.component';
import { JButtonComponent } from '../../../tailjng/button/button.component';

@Component({
  selector: 'app-validate',
  imports: [ReactiveFormsModule, JsonPipe, JInputComponent, JButtonComponent],
  templateUrl: './validate.html',
  styleUrl: './validate.css',
})
export class Validate {


  form!: FormGroup;
  result: any = null;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.initForm();
  }


  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)]],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      website: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      birthDay: ['', [Validators.required]],
      gender: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, {
      validators: this.passwordMatchValidator
    })
  }


  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    console.log('Password:', password);

    return password === confirmPassword ? null : { mismatch: true };

  }


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.result = this.form.value;
    console.log(this.result);

  }

}
