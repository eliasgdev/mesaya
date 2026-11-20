import { Component } from '@angular/core';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginFormComponent {

  onSubmit(): void {
    console.log('Login');
  }

}