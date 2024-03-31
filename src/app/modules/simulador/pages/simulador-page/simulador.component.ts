import { Component } from '@angular/core';
import { Undefinable } from 'src/app/shared/models/helpers/Undefinable.interface';
import { Encargo } from 'src/app/shared/models/interfaces/encargo.interface';
import { EstadoPiezaEnum } from 'src/app/shared/models/interfaces/estado-pieza.enum';
import { GastoAdicional } from 'src/app/shared/models/interfaces/gastoAdicional.interface';
import { Material } from 'src/app/shared/models/interfaces/material.interface';
import { Pieza } from 'src/app/shared/models/interfaces/pieza.interface';
import { AuthService } from "../../../../core/services/auth.service";
import { LocalUser } from "../../../../shared/models/interfaces/auth/local-user.interface";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";
import { EstadoEncargoEnum } from "../../../../shared/models/interfaces/estado-encargo.enum";

@Component({
    selector: 'app-simulador',
    templateUrl: './simulador.component.html',
    styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent {

    encargoId: Undefinable<string>;
    encargo: Encargo;

    materiales: Material[] = [
        {
            id: "0",
            nombre: "PLA",
            precioKg: 20,
            userId: "",
            tasaFallo: 10,
        },
        {
            id: "1",
            nombre: "ASA",
            precioKg: 25,
            userId: "",
            tasaFallo: 15,
        }
    ];

    piezasNuevas: Pieza[] = [];
    indiceEdit: Undefinable<number>;
    ficherosNuevos: Pieza[] = [];
    user: LocalUser;

    clientes: Cliente[] = [];

    constructor(
        private authService: AuthService
    ) {
        this.encargo = {
            id: "",
            fechaCreacion: null,
            fechaFinalizacion: null,
            iva: 21,
            nombre: "",
            observaciones: "",
            piezas: [],
            cliente: {
                id: "",
                nombre: "",
                userId: "",
            },
            precioHora: 0.3,
            gastosAdicionales: [],
            precioTotal: 0,
            dineroAdelantado: 0,
            img: "",
            estado: EstadoEncargoEnum.EnProceso,
        } as Encargo;
        this.user = this.authService.getCurrentUser()!;
        // TODO ELIMINAr
    }

    calculoPrecioPieza(pieza: Pieza) {
        if (this.encargo) {
            const precioPieza = pieza.horas * this.encargo.precioHora + this.calculoMaterialPieza(pieza);
            const tasaFallo = precioPieza * pieza.material.tasaFallo / 100;

            return precioPieza + tasaFallo;
        }
        return 0;
    }

    totalHoras() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) => accumulator + pieza.horas,
                0
            );
        }
        return 0;
    }

    totalGramos() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) => accumulator + pieza.gramos,
                0
            );
        }
        return 0;
    }

    totalPrecio() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) =>
                    accumulator + this.calculoPrecioPieza(pieza),
                0
            );
        }
        return 0;
    }

    totalEncargo() {
        if (this.encargo) {
            this.encargo.precioTotal = this.totalPrecio() + this.encargo.gastosAdicionales.reduce(
                (accumulator: number, gasto: GastoAdicional) => accumulator + gasto.precio, 0);
            return this.encargo.precioTotal;
        }
        return 0;
    }

    totalPrecioHoras() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) =>
                    accumulator + pieza.horas * this.encargo.precioHora,
                0
            );
        }
        return 0;
    }

    totalPrecioPieza() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) =>
                    accumulator + this.calculoMaterialPieza(pieza),
                0
            );
        }
        return 0;
    }

    calculoMaterialPieza(pieza: Pieza) {
        return (pieza.material.precioKg / 1000) * pieza.gramos;
    }

    openModalNuevaPieza(indice: Undefinable<number>) {
        if (this.encargo && indice !== undefined) {
            this.indiceEdit = indice;
            this.piezasNuevas = [{ ...this.encargo.piezas[this.indiceEdit] }];
        } else {
            this.indiceEdit = undefined;
            this.piezasNuevas = [
                {
                    nombre: "",
                    horas: 0,
                    gramos: 0,
                    estado: EstadoPiezaEnum.Esperando,
                    cantidad: 1,
                    material: this.materiales[0]
                }
            ];
        }
    }

    async deletePiezaFromEncargo(index: number) {
        this.encargo.piezas.splice(index, 1);
    }
    async eliminarGasto(indice: number) {
        this.encargo.gastosAdicionales.splice(indice, 1);
    }

}
