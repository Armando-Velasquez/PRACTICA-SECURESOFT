import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JInputComponent } from '../../../../tailjng/input/input/input.component';
import { JButtonComponent } from '../../../../tailjng/button/button.component';

@Component({
  selector: 'app-reactive-normal',
  imports: [ReactiveFormsModule, JsonPipe, JInputComponent, JButtonComponent],
  templateUrl: './normal.html',
  styleUrl: './normal.css',
})
export class ReactiveNormal {

  form!: FormGroup;
  result: any = null;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.initForm();
  }


  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
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
