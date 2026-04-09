import { Component } from '@angular/core';

import { ReactiveNormal } from '../../../example/form/reactive/normal/normal';
import { ReactiveGroup } from '../../../example/form/reactive/group/group';
import { ReactiveArray } from '../../../example/form/reactive/array/array';
import { TemplateNormal } from '../../../example/form/template-driven/normal/normal';
import { TemplateGroup } from '../../../example/form/template-driven/group/group';
import { TemplateArray } from '../../../example/form/template-driven/array/array';
import { Dialog } from '../../../example/alert/dialog/dialog';
import { Toast } from '../../../example/alert/toast/toast';
import { Validate } from '../../../example/form/validate/validate';
import { Xss } from '../../../example/xss/xss';

@Component({
  selector: 'app-home',
  imports: [ReactiveNormal, ReactiveGroup, ReactiveArray, TemplateNormal, TemplateGroup, TemplateArray, Dialog, Toast, Validate, Xss],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
 