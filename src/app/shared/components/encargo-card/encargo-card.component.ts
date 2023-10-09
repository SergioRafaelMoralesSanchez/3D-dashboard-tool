import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from '@angular/core';
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
export class EncargoCardComponent implements OnInit {

    @Input()
    encargo: Undefinable<EncargoDto>;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        if (this.encargo && !this.encargo.img.length) {
            this.encargo.img = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/3DBenchy.png/1024px-3DBenchy.png";
        }
    }
    getTotalHoras() {
        let horasTotal = 0;
        if (this.encargo) {
            this.encargo.piezas.forEach(pieza => {
                horasTotal += pieza.horas;
            });
        }
        return horasTotal;
    }

    getTotalHorasTeminados() {
        let horasTotal = 0;
        if (this.encargo) {
            this.encargo.piezas.forEach(pieza => {
                if (pieza.estado === EstadoPiezaEnum.Impreso) {
                    horasTotal += pieza.horas;
                }
            });
        }
        return horasTotal;
    }
}
