// ===============================
// ATOM — SELECT FIELD
// ===============================

import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.css'
})
export class SelectFieldComponent {

  @Input() label = '';

  @Input() options: string[] = [];

  selected = '';

}