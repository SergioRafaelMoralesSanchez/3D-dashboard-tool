import { EstadoEnum } from './estado.enum'
import { Material } from './material.interface'

export interface Pieza {
  nombre: string
  material: Material
  horas: number
  gramos: number
  estado: EstadoEnum
}

