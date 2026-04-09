import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-xss',
  imports: [ReactiveFormsModule],
  templateUrl: './xss.html',
  styleUrl: './xss.css',
})
export class Xss {

  form!: FormGroup;

  // Version insegura
  rawHtml: string = ''

  // Version forzada
  unsafeHtml!: SafeHtml;

  constructor(
    private readonly fb: FormBuilder,
    private readonly sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      comment: ['']
    })
  }


  update() {

    const value = this.form.get('comment')?.value || '';

    // Version insegura
    this.rawHtml = value;

    // Version forzada
    this.unsafeHtml = this.sanitizer.bypassSecurityTrustHtml(value);

    this.runAction(value)
  }


  runAction(value: string) {
    if (value.includes('alert')) {
      alert('Alerta ejecutada!');
    }
  }


  funx() {
    console.log('Función ejecutada!');
  }


}



// <div style="
// position:fixed;
// top:0;
// left:0;
// width:100vw;
// height:100vh;
// background:black;
// color:#00ff00;
// display:flex;
// flex-direction:column;
// align-items:center;
// justify-content:center;
// font-size:40px;
// z-index:999999;
// font-family:monospace;
// ">
//   <div>⚠️ SYSTEM BREACHED ⚠️</div>
//   <div style="font-size:20px;margin-top:20px">Accessing data...</div>
// </div>