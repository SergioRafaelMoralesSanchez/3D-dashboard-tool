import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EncargosService } from 'src/app/services/encargos.service'
import { smartfillBlanco } from 'src/app/shared/models/encargosdb'
import { Undefinable } from 'src/app/shared/models/helpers/Undefinable.interface'
import { Encargo } from 'src/app/shared/models/interfaces/encargo.interface'
import { EstadoEnum } from 'src/app/shared/models/interfaces/estado.enum'
import { Pieza } from 'src/app/shared/models/interfaces/pieza.interface'

@Component({
  selector: 'app-encargo',
  templateUrl: './encargo.component.html',
  styleUrls: ['./encargo.component.css']
})
export class EncargoComponent {
  estados = EstadoEnum
  encargoId: Undefinable<number>
  encargo: Undefinable<Encargo>

  ficherosNuevos: Pieza[] = [{} as Pieza]

  files: any
  constructor (
    activatedRoute: ActivatedRoute,
    private encargosService: EncargosService
  ) {
    activatedRoute.params.subscribe(parametros => {
      debugger
      if (parametros['id']) {
        this.encargoId = parametros['id']
        this.encargo = encargosService.getById(Number(parametros['id']))
      } else {
        this.encargo = {
   
        } as Encargo
      }
    })
  }
  calculoPrecioPieza (pieza: Pieza) {
    if (this.encargo) {
      return (
        pieza.horas * this.encargo.precioHora +
        (pieza.material.precioKg / 1000) * pieza.gramos
      )
    }
    return 0
  }

  file_changed (event: any) {
    this.ficherosNuevos = []
    const jamon = event as EventFile
    for (const file of jamon.target.files) {
      //Jamon_40g_1h22m.gcode
      const [nombre, gramos, horas] = file.name.replace('.gcode', '').split('_')
      const [hour, min] = horas.replace('m', '').split('h')
      this.ficherosNuevos.push({
        nombre,
        horas: Number((Number(hour) + Number(min) / 60).toFixed(2)),
        gramos: Number(gramos.replace('g', '')),
        material: smartfillBlanco,
        estado: EstadoEnum.Esperando
      })
    }
  }
  addPiezas () {
    for (const fichero of this.ficherosNuevos) {
      this.encargo?.piezas.push(fichero)
    }
  }
  totalHoras () {
    if (this.encargo) {
      return this.encargo.piezas.reduce(
        (accumulator, pieza: Pieza) => accumulator + pieza.horas,
        0
      )
    }
    return 0
  }
  totalGramos () {
    if (this.encargo) {
      return this.encargo.piezas.reduce(
        (accumulator, pieza: Pieza) => accumulator + pieza.gramos,
        0
      )
    }
    return 0
  }
  totalPrecio () {
    if (this.encargo) {
      return this.encargo.piezas.reduce(
        (accumulator, pieza: Pieza) =>
          accumulator + this.calculoPrecioPieza(pieza),
        0
      )
    }
    return 0
  }
  dropItLikeItsHot (jamon: Event) {
    console.log(jamon)
  }
}

interface EventFile {
  target: {
    files: FileGcode[]
  }
}

interface FileGcode {
  lastModified: string
  lastModifiedDate: string
  name: string
  size: number
  type: string
  webkitRelativePath: string
}
interface fileData {
  nombre: string
  horas: number
  gramos: number
}
