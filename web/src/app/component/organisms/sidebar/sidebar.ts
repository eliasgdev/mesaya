// =====================================
// ORGANISM — SIDEBAR
// =====================================

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AppLogoComponent } from '../../atoms/app-logo/app-logo';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AppLogoComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  readonly enlaces = [
    { ruta: '/dashboard', texto: 'Panel' },
    { ruta: '/pedidos', texto: 'Pedidos' },
    { ruta: '/mesas', texto: 'Mesas' },
    { ruta: '/productos', texto: 'Productos' },
    { ruta: '/clientes', texto: 'Clientes' },
  ];
}
