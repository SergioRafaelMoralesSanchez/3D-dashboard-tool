export interface Cliente {
    id: string
    nombre: string
    userId: string
}
export interface ClienteDto extends Cliente {
    encargosActivos: number
    encargosFinalizados: number
    dineroTotal: number
} 