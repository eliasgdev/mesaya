import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-number.html',
  styleUrl: './input-number.css'
})
export class InputNumberComponent {

  @Input() label = '';

  @Input() placeholder = '';

  value = 0;

}