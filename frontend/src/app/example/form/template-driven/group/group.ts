import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JButtonComponent } from '../../../../tailjng/button/button.component';

@Component({
  selector: 'app-template-group',
  imports: [FormsModule, JsonPipe, JButtonComponent],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class TemplateGroup {

  model = {
    user: {
      name: '',
      age: '',
    }
  }

  result: any = null;

  submit(form: any) {
    if (form.invalid) return;

    this.result = this.model;
    console.log(this.result);
  }


}
