// =====================================
// MOLECULE — MODAL
// =====================================

import { Component, ElementRef, afterNextRender, input, output, viewChild } from '@angular/core';

import { ModalCloseComponent } from '../../atoms/modal-close/modal-close';

/** Ventana modal accesible basada en <dialog>: se cierra con Esc o con la X. */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalCloseComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent {
  readonly title = input.required<string>();
  readonly ancho = input<'normal' | 'amplio'>('normal');
  readonly close = output<void>();
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  constructor() {
    afterNextRender(() => this.dialogo().nativeElement.showModal());
  }

  cerrar(): void {
    this.close.emit();
  }
}
