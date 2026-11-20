import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css'
})
export class InputFieldComponent {

  @Input() label = '';

  @Input() placeholder = '';

  @Input() type = 'text';

  value = '';

}