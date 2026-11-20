// =====================================
// MOLECULE — TABLE ACTIONS
// =====================================

import { Component, input, output } from '@angular/core';

import { IconButtonComponent } from '../../atoms/icon-button/icon-button';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './table-actions.html',
  styleUrl: './table-actions.css',
})
export class TableActionsComponent {
  /** Nombre del registro, para que el lector de pantalla diga "Editar Ajiaco". */
  readonly nombre = input('');
  readonly puedeEditar = input(true);
  readonly puedeEliminar = input(true);
  readonly editar = output<void>();
  readonly eliminar = output<void>();
}
