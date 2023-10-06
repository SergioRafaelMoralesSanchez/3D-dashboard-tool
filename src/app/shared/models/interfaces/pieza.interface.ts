import { EstadoPiezaEnum } from './estado-pieza.enum';
import { Material } from './material.interface';

export interface Pieza {
    nombre: string
    material: Material
    horas: number
    gramos: number
    cantidad: number
    estado: EstadoPiezaEnum
}

export interface PiezaDto {
    nombre: string
    materialId: string
    horas: number
    gramos: number
    cantidad: number
    estado: EstadoPiezaEnum
}
