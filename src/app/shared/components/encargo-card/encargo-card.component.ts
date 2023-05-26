import { Component, Input } from '@angular/core';
import { Undefinable } from '../../models/helpers/Undefinable.interface';
import { Encargo } from '../../models/interfaces/encargo.interface';
import { EstadoEnum } from '../../models/interfaces/estado.enum';

@Component({
    selector: 'app-encargo-card',
    templateUrl: './encargo-card.component.html',
    styleUrls: ['./encargo-card.component.css']
})
export class EncargoCardComponent {

    @Input()
    encargo: Undefinable<Encargo>

    getTotalHoras() {
        let horasTotal = 0
        if (this.encargo) {
            this.encargo.piezas.forEach(pieza => {
                horasTotal += pieza.horas
            });
        }
        return horasTotal
    }

    getTotalHorasTeminados() {
        let horasTotal = 0
        if (this.encargo) {
            this.encargo.piezas.forEach(pieza => {
                if (pieza.estado === EstadoEnum.Impreso) {
                    horasTotal += pieza.horas
                };
            });
        }
        return horasTotal
    }
}
