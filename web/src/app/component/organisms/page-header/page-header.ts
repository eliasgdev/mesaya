import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeaderComponent {

  @Input() title = '';

  @Input() buttonText = '';

}