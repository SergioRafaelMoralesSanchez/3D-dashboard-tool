import { Material } from './material.interface'

export interface Pieza {
  nombre: string
  material: Material
  horas: number
  gramos: number
  estado: EstadoEnum
}

export enum EstadoEnum {
  Esperando,
  Preparado,
  Impreso
}