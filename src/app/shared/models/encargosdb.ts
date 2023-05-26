import { Encargo } from "./interfaces/encargo.interface";
import { EstadoEnum } from "./interfaces/estado.enum";
const smartfillBlanco = {
    nombre: "smartfillBlanco",
    precioKg: 16
}
export const ENCARGOSDB: Encargo[] = [
    {
        id: 1,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [
            {nombre:"Arreglos Pc", precio: 5},
            {nombre:"Lijado pieza", precio: 5},
        ],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 2,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 3,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 4,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 5,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 6,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 7,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
    {
        id: 8,
        estado: EstadoEnum.EnProceso,
        nombre: "Accesorios Kafka",
        piezas: [
            {
                nombre: "Accesorios",
                material: smartfillBlanco,
                horas: 5.25,
                gramos: 95,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola White",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "Pistola Black",
                material: smartfillBlanco,
                horas: 31,
                gramos: 626,
                estado: EstadoEnum.Impreso,
            },
            {
                nombre: "cosaRandom",
                material: smartfillBlanco,
                horas: 5,
                gramos: 200,
                estado: EstadoEnum.Esperando,
            }
        ],
        cliente: {
            nombre: "Ruy"
        },
        precioHora: 0.3,
        gastosAdicionales: [],
        precioTotal: 45,
        img: "https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png"
    },
]