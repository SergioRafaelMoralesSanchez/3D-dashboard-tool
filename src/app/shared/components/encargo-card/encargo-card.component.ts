import { Component, Input } from '@angular/core';
import { Undefinable } from '../../models/helpers/Undefinable.interface';
import { Encargo } from '../../models/interfaces/encargo.interface';
import { EstadoEnum } from '../../models/interfaces/pieza.interface';

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
      console.log("🚀 ~ file: encargo-card.component.ts:29 ~ EncargoCardComponent ~ getTotalHoras ~ this.encargo.piezas:", this.encargo.piezas)
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
      console.log("🚀 ~ file: encargo-card.component.ts:29 ~ EncargoCardComponent ~ getTotalHoras ~ this.encargo.piezas:", this.encargo.piezas)
    }
    return horasTotal
  }
}
