// =====================================
// PAGE — LOGIN PAGE
// =====================================

import { Component } from '@angular/core';

import { AuthLayoutComponent } from '../../component/organisms/auth-layout/auth-layout';
import { LoginFormComponent } from '../../component/molecules/login-form/login-form';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    LoginFormComponent
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent {}