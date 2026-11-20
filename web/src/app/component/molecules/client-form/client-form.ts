// =====================================
// MOLECULE — CLIENT FORM
// =====================================

import { Component } from '@angular/core';

import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css'
})
export class ClientFormComponent {}