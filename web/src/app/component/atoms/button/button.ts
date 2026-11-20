// =====================================
// ATOM — BUTTON
// =====================================

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  readonly text = input('');
  readonly type = input<'primary' | 'secondary' | 'danger' | 'success' | 'ghost'>('primary');
  readonly buttonType = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
}
