// =====================================
// MOLECULE — CONFIRM DIALOG
// =====================================

import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';
import { ModalCloseComponent } from '../../atoms/modal-close/modal-close';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    ModalCloseComponent
  ],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialogComponent {

  @Input() title = '';

  @Input() message = '';

}