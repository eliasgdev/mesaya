import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css'
})
export class IconButtonComponent {

  @Input() icon = '';

  @Input() type:
    | 'primary'
    | 'danger'
    | 'success'
    | 'secondary'
  = 'primary';

}