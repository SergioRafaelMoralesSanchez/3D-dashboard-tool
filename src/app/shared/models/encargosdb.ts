import { Encargo } from './interfaces/encargo.interface'
import { EstadoEnum } from './interfaces/estado.enum'
import { Material } from './interfaces/material.interface'
export const MATERIALESDB: Material[] = [
  {
    id: 0,
    nombre: 'SmartFill Blanco',
    precioKg: 16
  },
  {
    id: 1,
    nombre: 'Amazon Transparente',
    precioKg: 20
  }
]
export const ENCARGOSDB: Encargo[] = [
  {
    id: 1,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 1,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [
      { nombre: 'Arreglos Pc', precio: 5 },
      { nombre: 'Lijado pieza', precio: 5 }
    ],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  },
  {
    id: 2,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        "nombre": "Frontal-2",
        "horas": 7.13,
        "gramos": 170,
        "material": MATERIALESDB[0],
        "estado": 0
    },
    {
        "nombre": "Frontal-1",
        "horas": 6.85,
        "gramos": 154,
        "material": MATERIALESDB[0],
        "estado": 0
    },
    {
      "nombre": "Frontal-2Again",
      "horas": 7.13,
      "gramos": 170,
      "material": MATERIALESDB[0],
      "estado": 0
  },
  {
      "nombre": "Frontal-1Again",
      "horas": 6.85,
      "gramos": 154,
      "material": MATERIALESDB[0],
      "estado": 0
  },
      {
          "nombre": "handgrip",
          "horas": 7.7,
          "gramos": 183,
          "material": MATERIALESDB[0],
          "estado": 0
      },
      {
          "nombre": "lateral",
          "horas": 5.52,
          "gramos": 126,
          "material": MATERIALESDB[0],
          "estado": 0
      }
  ],
    cliente: {
      id: 2,
      nombre: 'Rafa'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/21513824/illustration-file/18d04e0f-e752-47c5-bfe3-73d967adf174/Pizarro_v02completo.png'
  },
  {
    id: 3,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 3,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  },
  {
    id: 4,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 4,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  },
  {
    id: 5,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 5,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  },
  {
    id: 6,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 6,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  },
  {
    id: 7,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 7,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  },
  {
    id: 8,
    estado: EstadoEnum.EnProceso,
    nombre: 'Accesorios Kafka',
    fechaCreacion: new Date(),
    fechaFinalizacion: undefined,
    piezas: [
      {
        nombre: 'Accesorios',
        material: MATERIALESDB[0],
        horas: 5.25,
        gramos: 95,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola White',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'Pistola Black',
        material: MATERIALESDB[0],
        horas: 31,
        gramos: 626,
        estado: EstadoEnum.Impreso
      },
      {
        nombre: 'cosaRandom',
        material: MATERIALESDB[0],
        horas: 5,
        gramos: 200,
        estado: EstadoEnum.Esperando
      }
    ],
    cliente: {
      id: 8,
      nombre: 'Ruy'
    },
    precioHora: 0.3,
    gastosAdicionales: [],
    precioTotal: 45,
    img: 'https://files.cults3d.com/uploaders/20259847/illustration-file/b90e9ffd-3246-46a1-bb89-867a1faf33f2/Cover.png'
  }
]
