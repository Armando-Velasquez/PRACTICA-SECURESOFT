import { Component } from '@angular/core';
import { JButtonComponent } from '../../../tailjng/button/button.component';
import { JAlertDialogService } from 'tailjng';

@Component({
  selector: 'app-dialog',
  imports: [JButtonComponent],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {

  constructor(
    private readonly dialog: JAlertDialogService
  ) { }


  onAlertDialog1() {
    this.dialog.AlertDialog({
      type: 'success',
      description: 'Esta es un alerta de ejemplo',
      title: 'Alerta de ejemplo',
      onConfirm() { },
    })
  }

  onAlertDialog2() {
    this.dialog.AlertDialog({
      type: 'error',
      description: 'Esta es un alerta de ejemplo',
      title: 'Alerta de ejemplo',
      onConfirm() { },
      onCancel() { },
      onRetry() { },

    })
  }

  onAlertDialog3() {
    this.dialog.AlertDialog({
      type: 'info',
      description: 'Esta es un alerta de ejemplo',
      title: 'Alerta de ejemplo',
      onConfirm() { },
      onCancel() { },
    })
  }

  onAlertDialog4() {
    this.dialog.AlertDialog({
      type: 'warning',
      description: 'Esta es un alerta de ejemplo',
      title: 'Alerta de ejemplo',
      onConfirm() { },
      onCancel() { },
    })
  }

  onAlertDialog5() {
    this.dialog.AlertDialog({
      type: 'loading',
      description: 'Esta es un alerta de ejemplo',
      title: 'Alerta de ejemplo',
      onCancel() { },

    })
  }

  onAlertDialog6() {
    this.dialog.AlertDialog({
      type: 'question',
      description: 'Esta es un alerta de ejemplo',
      title: 'Alerta de ejemplo',
      onConfirm() { },
      onCancel() { },
    })
  }

}
