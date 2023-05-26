import { Cliente } from './cliente.interface'
import { Pieza } from './pieza.interface'
import { GastoAdicional } from './gastoAdicional.interface'
import { EstadoEnum } from './estado.enum'

export interface Encargo {
  id: number
  nombre: string
  piezas: Pieza[]
  cliente: Cliente
  precioHora: number
  gastosAdicionales: GastoAdicional[]
  precioTotal: number
  img: string
  estado: EstadoEnum
}
