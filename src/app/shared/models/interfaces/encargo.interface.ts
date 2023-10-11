import { Nullable } from "../helpers/Nullable.interface";
import { Cliente } from './cliente.interface';
import { EstadoEncargoEnum } from "./estado-encargo.enum";
import { GastoAdicional } from './gastoAdicional.interface';
import { Pieza, PiezaDto } from './pieza.interface';

export interface Encargo {
    id: string
    fechaCreacion: Nullable<Date>
    fechaFinalizacion: Nullable<Date>
    nombre: string
    observaciones?: string
    piezas: Pieza[]
    cliente: Cliente
    precioHora: number
    gastosAdicionales: GastoAdicional[]
    precioTotal: number
    img: string
    estado: EstadoEncargoEnum

}
export interface EncargoDto {
    id: string
    fechaCreacion: Nullable<Date>
    fechaFinalizacion: Nullable<Date>
    nombre: string
    observaciones?: string
    piezas: PiezaDto[]
    clienteId: string
    precioHora: number
    gastosAdicionales: GastoAdicional[]
    precioTotal: number
    img: string
    estado: EstadoEncargoEnum
    userId: string
}
