// =====================================
// ORGANISM — SIDEBAR
// =====================================

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppLogoComponent } from '../../atoms/app-logo/app-logo';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    AppLogoComponent
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {}