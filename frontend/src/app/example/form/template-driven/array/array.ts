import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JButtonComponent } from '../../../../tailjng/button/button.component';

@Component({
  selector: 'app-template-array',
  imports: [FormsModule, JsonPipe, JButtonComponent],
  templateUrl: './array.html',
  styleUrl: './array.css',
})
export class TemplateArray {

  phones: string[] = [''];
  
  result: any = null;


  addPhone() {
    this.phones.push('');
  }

  submit(form: any) {
    if (form.invalid) return;

    this.result = this.phones;
    console.log(this.result);
  }

}
