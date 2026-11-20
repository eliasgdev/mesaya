import { Routes } from '@angular/router';

import { authGuard, invitadoGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'login',
    canActivate: [invitadoGuard],
    title: 'Iniciar sesión · MesaYa',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPageComponent),
  },
  {
    path: 'register',
    canActivate: [invitadoGuard],
    title: 'Crear cuenta · MesaYa',
    loadComponent: () => import('./pages/register-page/register-page').then((m) => m.RegisterPageComponent),
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Panel · MesaYa',
        loadComponent: () => import('./pages/dashboard-page/dashboard-page').then((m) => m.DashboardPageComponent),
      },
      {
        path: 'productos',
        title: 'Productos · MesaYa',
        loadComponent: () => import('./pages/productos-page/productos-page').then((m) => m.ProductosPageComponent),
      },
      {
        path: 'clientes',
        title: 'Clientes · MesaYa',
        loadComponent: () => import('./pages/clientes-page/clientes-page').then((m) => m.ClientesPageComponent),
      },
      {
        path: 'mesas',
        title: 'Mesas · MesaYa',
        loadComponent: () => import('./pages/mesas-page/mesas-page').then((m) => m.MesasPageComponent),
      },
      {
        path: 'pedidos',
        title: 'Pedidos · MesaYa',
        loadComponent: () => import('./pages/pedidos-page/pedidos-page').then((m) => m.PedidosPageComponent),
      },
      {
        path: 'pedido/:id',
        title: 'Detalle del pedido · MesaYa',
        loadComponent: () =>
          import('./pages/pedido-detail-page/pedido-detail-page').then((m) => m.PedidoDetailPageComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
