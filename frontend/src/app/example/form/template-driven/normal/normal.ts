import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JButtonComponent } from '../../../../tailjng/button/button.component';

@Component({
  selector: 'app-template-normal',
  imports: [FormsModule, JsonPipe, JButtonComponent],
  templateUrl: './normal.html',
  styleUrl: './normal.css',
})
export class TemplateNormal {

  model = {
    email: '',
    password: '',
  }

  result: any = null;

  submit(form: any) {
    if (form.invalid) return;

    this.result = this.model;
    console.log(this.result);
  }

}
