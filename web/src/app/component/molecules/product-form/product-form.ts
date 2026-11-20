// =====================================
// MOLECULE — PRODUCT FORM
// =====================================

import { Component } from '@angular/core';

import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { InputNumberComponent } from '../../atoms/input-number/input-number';
import { SelectFieldComponent } from '../../atoms/select-field/select-field';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    InputNumberComponent,
    SelectFieldComponent,
    ButtonComponent
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent {

  categories = [
    'Comida rápida',
    'Bebidas',
    'Postres'
  ];

}