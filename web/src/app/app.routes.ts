import { Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page';
import { RegisterPageComponent } from './pages/register-page/register-page';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page';
import { ProductosPageComponent } from './pages/productos-page/productos-page';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page';
import { MesasPageComponent } from './pages/mesas-page/mesas-page';
import { PedidosPageComponent } from './pages/pedidos-page/pedidos-page';
import { PedidoDetailPageComponent } from './pages/pedido-detail-page/pedido-detail-page';

export const routes: Routes = [

  {
    path: '',
    component: LoginPageComponent
  },

  {
    path: 'register',
    component: RegisterPageComponent
  },

  {
    path: 'dashboard',
    component: DashboardPageComponent
  },

  {
    path: 'productos',
    component: ProductosPageComponent
  },

  {
    path: 'clientes',
    component: ClientesPageComponent
  },

  {
    path: 'mesas',
    component: MesasPageComponent
  },

  {
    path: 'pedidos',
    component: PedidosPageComponent
  },

  {
    path: 'pedido/:id',
    component: PedidoDetailPageComponent
  }

];