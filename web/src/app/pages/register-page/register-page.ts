// =====================================
// PAGE — REGISTER PAGE
// =====================================

import { Component } from '@angular/core';

import { AuthLayoutComponent } from '../../component/organisms/auth-layout/auth-layout';
import { RegisterFormComponent } from '../../component/molecules/register-form/register-form';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    RegisterFormComponent
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPageComponent {}