import { CommonModule } from "@angular/common";
import { Component, Input } from '@angular/core';
import { Undefinable } from '../../models/helpers/Undefinable.interface';
import { EncargoDto } from '../../models/interfaces/encargo.interface';
import { EstadoPiezaEnum } from '../../models/interfaces/estado-pieza.enum';

@Component({
    selector: 'app-encargo-card',
    templateUrl: './encargo-card.component.html',
    styleUrls: ['./encargo-card.component.css'],
    imports: [
        CommonModule
    ],
    standalone: true
})
export class EncargoCardComponent {

    @Input()
    encargo: Undefinable<EncargoDto>;

    getTotalHorasTeminados() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza) => {
                    if (pieza.estado === EstadoPiezaEnum.Impreso) accumulator += pieza.horas;
                    return accumulator;
                },
                0
            );
        }
        return 0;
    }

    getTotalHoras() {
        if (this.encargo) {
            return this.encargo.piezas.reduce((accumulator, pieza) => accumulator + pieza.horas, 0);
        }
        return 0;
    }

    getPiezasTerminadas() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza) => {
                    if (pieza.estado === EstadoPiezaEnum.Impreso) ++accumulator;
                    return accumulator;
                },
                0
            );
        }
        return 0;
    }
}
