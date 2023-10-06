import es from '@angular/common/locales/es';
import { Component, Input } from '@angular/core';

import { CommonModule, registerLocaleData } from "@angular/common";

registerLocaleData(es);

@Component({
    selector: 'loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ],
})
export class LoadingSpinnerComponent {

    @Input()
    loading = false;

    @Input()
    small = false;
}
