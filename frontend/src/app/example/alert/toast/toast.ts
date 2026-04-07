import { Component } from '@angular/core';
import { JButtonComponent } from '../../../tailjng/button/button.component';
import { JAlertToastService } from 'tailjng';

@Component({
  selector: 'app-toast',
  imports: [JButtonComponent],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {

  constructor(
    private readonly toast: JAlertToastService
  ) { }


  onAlertToast1() {
    this.toast.AlertToast({
      type: 'success',
      title: 'Toast de ejemplo',
      description: 'Esta es un toast de ejemplo',
      autoClose: true,
      autoCloseDelay: 1000,
    })
  }

  onAlertToast2() {
    this.toast.AlertToast({
      type: 'error',
      title: 'Toast de ejemplo',
      description: 'Esta es un toast de ejemplo',
    })
  }

  onAlertToast3() {
    this.toast.AlertToast({
      type: 'info',
      title: 'Toast de ejemplo',
      description: 'Esta es un toast de ejemplo',
    })
  }

  onAlertToast4() {
    this.toast.AlertToast({
      type: 'warning',
      title: 'Toast de ejemplo',
      description: 'Esta es un toast de ejemplo',
    })
  }

  onAlertToast5() {
    this.toast.AlertToast({
      type: 'loading',
      title: 'Toast de ejemplo',
      description: 'Esta es un toast de ejemplo',
      onCancel() {

      },
    })
  }

  onAlertToast6() {
    this.toast.AlertToast({
      type: 'question',
      title: 'Toast de ejemplo',
      description: 'Esta es un toast de ejemplo',
      onAction() {

      },
      onCancel() {

      },
    })
  }

}
