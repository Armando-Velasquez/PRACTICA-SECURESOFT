import { Component, Injector, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JAlertDialogComponent } from './tailjng/alert/alert-dialog/dialog-alert.component';

export let AppInjector: Injector;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JAlertDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('Securesoft');

  constructor(
    private readonly injector: Injector,
  ) {
    AppInjector = this.injector;
  }

}
