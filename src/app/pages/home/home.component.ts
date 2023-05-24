import { Component } from '@angular/core';
import { Encargo } from 'src/app/shared/models/interfaces/encargo.interface';
import { Material } from 'src/app/shared/models/interfaces/material.interface';
import { EstadoEnum } from 'src/app/shared/models/interfaces/pieza.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  smartfillBlanco: Material = {
    nombre: "smartfillBlanco",
    precioKg: 16
  }
  encargos: Encargo[] = [
    {
      nombre: "Accesorios Kafka",
      piezas: [
        {
          nombre: "Accesorios",
          material: this.smartfillBlanco,
          horas: 5.25,
          gramos: 95,
          estado: EstadoEnum.Impreso,
        },
        {
          nombre: "Pistola White",
          material: this.smartfillBlanco,
          horas: 31,
          gramos: 626,
          estado: EstadoEnum.Impreso,
        },
        {
          nombre: "Pistola Black",
          material: this.smartfillBlanco,
          horas: 31,
          gramos: 626,
          estado: EstadoEnum.Impreso,
        },
        {
          nombre: "cosaRandom",
          material: this.smartfillBlanco,
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
      img: ""
    }
  ]
}
