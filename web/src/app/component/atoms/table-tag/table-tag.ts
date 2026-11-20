// =====================================
// ATOM — TABLE TAG
// =====================================

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-tag',
  standalone: true,
  templateUrl: './table-tag.html',
  styleUrl: './table-tag.css',
})
export class TableTagComponent {
  readonly text = input('');
  readonly type = input<'primary' | 'success' | 'danger' | 'warning'>('primary');
}
