// =====================================
// MOLECULE — TABLE SEARCH
// =====================================

import { Component } from '@angular/core';

import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button';

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [
    InputFieldComponent,
    IconButtonComponent
  ],
  templateUrl: './table-search.html',
  styleUrl: './table-search.css'
})
export class TableSearchComponent {}