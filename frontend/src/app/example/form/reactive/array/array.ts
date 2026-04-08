import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JInputComponent } from '../../../../tailjng/input/input/input.component';
import { JButtonComponent } from '../../../../tailjng/button/button.component';

@Component({
  selector: 'app-reactive-array',
  imports: [ReactiveFormsModule, JsonPipe, JInputComponent, JButtonComponent],
  templateUrl: './array.html',
  styleUrl: './array.css',
})
export class ReactiveArray {

  form!: FormGroup;
  result: any = null;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      phones: this.fb.array([
        this.fb.control('', [Validators.required]),
      ])
    })
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }


  addPhone() {
    this.phones.push(
      this.fb.control('', [Validators.required])
    )
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
