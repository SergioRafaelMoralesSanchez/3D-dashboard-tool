import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';
import { Undefinable } from 'src/app/shared/models/helpers/Undefinable.interface';
import { Encargo } from 'src/app/shared/models/interfaces/encargo.interface';
import { EstadoEnum } from 'src/app/shared/models/interfaces/estado.enum';
import { Pieza } from 'src/app/shared/models/interfaces/pieza.interface';

@Component({
  selector: 'app-encargo',
  templateUrl: './encargo.component.html',
  styleUrls: ['./encargo.component.css']
})
export class EncargoComponent {
  estados = EstadoEnum
  encargoId: Undefinable<number>
  encargo: Undefinable<Encargo>
  constructor(activatedRoute: ActivatedRoute, private encargosService: EncargosService) {
    activatedRoute.params.subscribe(parametros => {
      this.encargoId = parametros['id']
      this.encargo = encargosService.getById(Number(parametros['id']))
    })
  }
  calculoPrecioPieza(pieza: Pieza) {
    if (this.encargo) {

      return (pieza.horas * this.encargo.precioHora) + (pieza.material.precioKg / 1000 * pieza.gramos)
    }
    return 0
  }
  totalHoras() {
    if (this.encargo) {
      return this.encargo.piezas.reduce((accumulator, pieza: Pieza) => accumulator + pieza.horas, 0)
    }
    return 0
  }
  totalGramos() {
    if (this.encargo) {
      return this.encargo.piezas.reduce((accumulator, pieza: Pieza) => accumulator + pieza.gramos, 0)
    }
    return 0
  }
  totalPrecio() {
    if (this.encargo) {
      return this.encargo.piezas.reduce((accumulator, pieza: Pieza) => accumulator + this.calculoPrecioPieza(pieza), 0)
    }
    return 0
  }
  dropItLikeItsHot(jamon:Event){
    console.log(jamon)
  }
}
