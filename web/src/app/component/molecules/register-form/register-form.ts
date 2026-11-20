// =====================================
// MOLECULE — REGISTER FORM
// =====================================

import { Component } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterFormComponent {}