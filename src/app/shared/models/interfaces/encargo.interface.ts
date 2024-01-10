import { Nullable } from "../helpers/Nullable.interface";
import { Cliente } from './cliente.interface';
import { EstadoEncargoEnum } from "./estado-encargo.enum";
import { GastoAdicional } from './gastoAdicional.interface';
import { Pieza, PiezaDto } from './pieza.interface';

export interface Encargo {
    id: string
    fechaCreacion: Nullable<Date>
    fechaFinalizacion: Nullable<Date>
    iva: number
    nombre: string
    observaciones?: string
    piezas: Pieza[]
    cliente: Cliente
    precioHora: number
    gastosAdicionales: GastoAdicional[]
    precioTotal: number
    img: string
    estado: EstadoEncargoEnum
    dineroAdelantado: number

}
export interface EncargoDto {
    id: string
    fechaCreacion: Nullable<Date>
    fechaFinalizacion: Nullable<Date>
    iva: number
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
    dineroAdelantado: number
}
