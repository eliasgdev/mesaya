// =====================================
// MOLECULE — CONFIRM DIALOG
// =====================================

import { Component, input, output } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ErrorMessageComponent } from '../../atoms/error-message/error-message';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ButtonComponent, ErrorMessageComponent, ModalComponent],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialogComponent {
  readonly title = input('¿Estás seguro?');
  readonly message = input('');
  readonly confirmText = input('Eliminar');
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly confirmar = output<void>();
  readonly cancelar = output<void>();
}
