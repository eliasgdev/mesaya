import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-tag.html',
  styleUrl: './table-tag.css'
})
export class TableTagComponent {

  @Input() text = '';

  @Input() type:
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
  = 'primary';

}