// =====================================
// ORGANISM — NAVBAR
// =====================================

import { Component, inject, input } from '@angular/core';

import { IconButtonComponent } from '../../atoms/icon-button/icon-button';
import { AuthService } from '../../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  readonly title = input('');
  protected readonly auth = inject(AuthService);
}
