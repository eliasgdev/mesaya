// =====================================
// ATOM — LINK TEXT
// =====================================

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-text',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './link-text.html',
  styleUrl: './link-text.css',
})
export class LinkTextComponent {
  readonly text = input('');
  readonly link = input('');
}
