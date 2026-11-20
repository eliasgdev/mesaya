// =====================================
// MOLECULE — TABLE SEARCH
// =====================================

import { Component, input, model } from '@angular/core';

import { InputFieldComponent } from '../../atoms/input-field/input-field';

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './table-search.html',
  styleUrl: './table-search.css',
})
export class TableSearchComponent {
  readonly placeholder = input('Buscar…');
  readonly termino = model('');
}
