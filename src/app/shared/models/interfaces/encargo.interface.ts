import { Cliente } from './cliente.interface'
import { Pieza } from './pieza.interface'
import { GastoAdicional } from './gastoAdicional.interface'

export interface Encargo {
  nombre: string
  piezas: Pieza[]
  cliente: Cliente
  precioHora: number
  gastosAdicionales: GastoAdicional[]
  precioTotal: number
  img: string
}
