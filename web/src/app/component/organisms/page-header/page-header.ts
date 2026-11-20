// =====================================
// ORGANISM — PAGE HEADER
// =====================================

import { Component, input, output } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeaderComponent {
  readonly title = input('');
  readonly subtitle = input('');
  readonly buttonText = input('');
  readonly accion = output<void>();
}
