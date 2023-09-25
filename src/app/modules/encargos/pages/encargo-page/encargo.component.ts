import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncargosService } from 'src/app/modules/encargos/services/encargos.service';
import { MATERIALESDB } from 'src/app/data/encargosdb';
import { Undefinable } from 'src/app/shared/models/helpers/Undefinable.interface';
import { Encargo, EncargoDto } from 'src/app/shared/models/interfaces/encargo.interface';
import { EstadoEnum } from 'src/app/shared/models/interfaces/estado.enum';
import { GastoAdicional } from 'src/app/shared/models/interfaces/gastoAdicional.interface';
import { Material } from 'src/app/shared/models/interfaces/material.interface';
import { Pieza, PiezaDto } from 'src/app/shared/models/interfaces/pieza.interface';
import { ClientesService } from "../../../clientes/pages/services/clientes.service";
import { MaterialesService } from "../../../materiales/pages/services/materiales.service";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";

@Component({
    selector: 'app-encargo',
    templateUrl: './encargo.component.html',
    styleUrls: ['./encargo.component.css']
})
export class EncargoComponent implements OnInit {
    encargoId: Undefinable<number>;
    encargo: Undefinable<Encargo>;
    materialesMapped: Map<string, Material> = new Map();
    materiales: Material[] = [];
    materialPredeterminado = MATERIALESDB[0];

    estados = EstadoEnum;

    piezasNuevas: Pieza[] = [];
    isNuevaPieza = false;
    indiceEdit: Undefinable<number>;
    ficherosNuevos: Pieza[] = [];
    // gastoAdicional: Undefinable<GastoAdicional>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private encargosService: EncargosService,
        private clientesService: ClientesService,
        private materialesService: MaterialesService
    ) { }
    async ngOnInit(): Promise<void> {
        await this.getStoredEncargo();

    }

    async getStoredEncargo() {
        this.activatedRoute.params.subscribe(async parametros => {
            if (parametros['id']) {
                this.encargoId = parametros['id'];
                const encargoDto = await this.encargosService.getById(parametros['id']);
                if (encargoDto) {
                    const cliente = await this.clientesService.getById(encargoDto?.clienteId);
                    this.materialesMapped = await this.materialesService.getAllMapped();
                    this.materiales = [...this.materialesMapped.values()].map<Material>((material: Material, index: number) => ({
                        id: [...this.materialesMapped.keys()][index],
                        nombre: material.nombre,
                        precioKg: material.precioKg,
                    }));
                    console.log("🚀 ~ file: encargo.component.ts:55 ~ EncargoComponent ~ this.materiales=[...this.materialesMapped.values ~  this.materiales :", this.materiales);
                    if (cliente && this.materiales) {
                        this.encargo = {
                            ...encargoDto,
                            id: encargoDto.id,
                            piezas: this.regeneratePiezas(encargoDto, this.materialesMapped),
                            cliente,
                        };
                    }
                }
            } else {
                this.encargo = {
                    id: "",
                    fechaCreacion: new Date(),
                    fechaFinalizacion: null,
                    nombre: "",
                    observaciones: "",
                    piezas: [],
                    cliente: {

                    } as Cliente,
                    precioHora: 0,
                    gastosAdicionales: [],
                    precioTotal: 0,
                    img: "",
                    estado: EstadoEnum.Esperando,
                };
                console.log("🚀 ~ file: encargo.component.ts:63 ~ EncargoComponent ~ getStoredEncargo ~  this.encargo :", this.encargo);
            }
        });
    }
    // ...pieza, material: materiales.get(pieza.materialId)!
    regeneratePiezas(encargoDto: EncargoDto, materiales: Map<string, Material>): Pieza[] {
        return encargoDto.piezas.map((pieza: PiezaDto) => {
            return {
                nombre: pieza.nombre,
                material: {
                    ...materiales.get(pieza.materialId)!,
                    id: pieza.materialId,
                },
                horas: pieza.horas,
                gramos: pieza.gramos,
                estado: pieza.estado,
            };
        });
    }

    calculoPrecioPieza(pieza: Pieza) {
        if (this.encargo) {
            return (
                pieza.horas * this.encargo.precioHora + this.calculoMaterialPieza(pieza)
            );
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

            return this.totalPrecio() + this.encargo.gastosAdicionales.reduce(
                (accumulator: number, gasto: GastoAdicional) => accumulator + gasto.precio, 0);
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

    editartPieza(indice: number) {
        if (this.encargo) {
            this.indiceEdit = indice;
            this.isNuevaPieza = true;
            this.piezasNuevas[0] = { ...this.encargo.piezas[indice] };
        }
    }
    async deletePiezaFromEncargo(index: number) {
        this.encargo?.piezas.splice(index, 1);

        await this.uploadEncargo();
    }
    async eliminarGasto(indice: number) {
        this.encargo?.gastosAdicionales.splice(indice, 1);
        await this.uploadEncargo();
    }

    async uploadEncargo() {
        this.isNuevaPieza = false;
        if (this.encargo) {
            const encargoDto: EncargoDto = {
                id: "",
                fechaCreacion: this.encargo.fechaCreacion,
                fechaFinalizacion: this.encargo.fechaFinalizacion,
                nombre: this.encargo.nombre,
                observaciones: this.encargo.observaciones,
                piezas: this.encargo.piezas.map<PiezaDto>(pieza => ({
                    nombre: pieza.nombre,
                    materialId: pieza.material.id,
                    horas: pieza.horas,
                    gramos: pieza.gramos,
                    estado: pieza.estado,
                })),
                clienteId: this.encargo.cliente.id,
                precioHora: this.encargo.precioHora,
                gastosAdicionales: this.encargo.gastosAdicionales,
                precioTotal: this.encargo.precioTotal,
                img: this.encargo.img,
                estado: this.encargo.estado,
            };
            await this.encargosService.updateDoc(this.encargo.id, encargoDto);

        }
    }
}
