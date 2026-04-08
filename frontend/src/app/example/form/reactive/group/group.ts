import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JInputComponent } from '../../../../tailjng/input/input/input.component';
import { JButtonComponent } from '../../../../tailjng/button/button.component';

@Component({
  selector: 'app-reactive-group',
  imports: [ReactiveFormsModule, JsonPipe, JInputComponent, JButtonComponent],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class ReactiveGroup {

  form!: FormGroup;
  result: any = null;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      user: this.fb.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.required, Validators.min(18)]]
      }),
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
