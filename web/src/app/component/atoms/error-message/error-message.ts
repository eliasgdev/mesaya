// =====================================
// ATOM — ERROR MESSAGE
// =====================================

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  templateUrl: './error-message.html',
  styleUrl: './error-message.css',
})
export class ErrorMessageComponent {
  readonly message = input<string | null>('');
}
