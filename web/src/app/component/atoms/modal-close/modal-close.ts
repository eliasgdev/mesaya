import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-close',
  standalone: true,
  templateUrl: './modal-close.html',
  styleUrl: './modal-close.css'
})
export class ModalCloseComponent {

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

}