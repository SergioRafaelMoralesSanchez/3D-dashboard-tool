import es from '@angular/common/locales/es';
import { Component, Input } from '@angular/core';

import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input()
  loading = false;

  @Input()
  small = false;
}
