import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargosService } from 'src/app/modules/encargos/services/encargos.service';
import { Undefinable } from 'src/app/shared/models/helpers/Undefinable.interface';
import { Encargo, EncargoDto } from 'src/app/shared/models/interfaces/encargo.interface';
import { EstadoPiezaEnum } from 'src/app/shared/models/interfaces/estado-pieza.enum';
import { GastoAdicional } from 'src/app/shared/models/interfaces/gastoAdicional.interface';
import { Material } from 'src/app/shared/models/interfaces/material.interface';
import { Pieza, PiezaDto } from 'src/app/shared/models/interfaces/pieza.interface';
import { AuthService } from "../../../../core/services/auth.service";
import { LocalUser } from "../../../../shared/models/interfaces/auth/local-user.interface";
import { ClientesService } from "../../../clientes/pages/services/clientes.service";
import { MaterialesService } from "../../../materiales/pages/services/materiales.service";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";

@Component({
    selector: 'app-encargo',
    templateUrl: './encargo.component.html',
    styleUrls: ['./encargo.component.css']
})
export class EncargoComponent implements OnInit {
    encargoId: Undefinable<string>;
    encargo: Undefinable<Encargo>;
    materialesMapped: Map<string, Material> = new Map();
    materiales: Material[] = [];

    estados = EstadoPiezaEnum;
    isEditing = false;
    piezasNuevas: Pieza[] = [];
    isNuevaPieza = false;
    indiceEdit: Undefinable<number>;
    ficherosNuevos: Pieza[] = [];
    user: LocalUser;

    clientes: Cliente[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private encargosService: EncargosService,
        private clientesService: ClientesService,
        private materialesService: MaterialesService,
        private router: Router,
        private authSevice: AuthService
    ) {
        this.user = this.authSevice.getCurrentUser()!;
    }
    async ngOnInit(): Promise<void> {
        const routes = this.activatedRoute.snapshot.params;
        if (routes["id"]) {
            this.encargoId = routes['id'];
            await this.getStoredEncargo();
        } else {
            await this.storeAndLoadEncargo();
        }
    }

    async activarModoEdicion() {
        this.isEditing = !this.isEditing;
        if (!this.clientes.length) {
            this.clientes = await this.clientesService.getAll();
        }
    }

    async getStoredEncargo() {
        if (this.encargoId) {
            const encargoDto = await this.encargosService.getById(this.encargoId);
            if (encargoDto) {
                const cliente = await this.clientesService.getById(encargoDto?.clienteId);
                this.materialesMapped = await this.materialesService.getAllMapped();
                this.materiales = [...this.materialesMapped.values()].map<Material>((material: Material, index: number) => ({
                    id: [...this.materialesMapped.keys()][index],
                    nombre: material.nombre,
                    precioKg: material.precioKg,
                    userId: material.userId,
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
        }
    }

    async storeAndLoadEncargo() {
        const encargoDto: EncargoDto = {
            "fechaCreacion": new Date(),
            "precioHora": 0.3,
            "gastosAdicionales": [],
            "nombre": "",
            "estado": 2,
            "clienteId": "HF5FvmjSmitFYVWXfJGe",
            "precioTotal": 0,
            "observaciones": "",
            "piezas": [],
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/3DBenchy.png/1024px-3DBenchy.png",
            "fechaFinalizacion": null,
            "id": "",
            userId: this.user?.uid
        };
        const documentRef = await this.encargosService.addDoc(encargoDto);
        if (documentRef) this.router.navigateByUrl("encargos/" + documentRef.id);
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
                cantidad: 1,
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

            return this.encargo.precioTotal = this.totalPrecio() + this.encargo.gastosAdicionales.reduce(
                (accumulator: number, gasto: GastoAdicional) => accumulator + gasto.precio, 0);
        }
        return 0;
    }

    totalPrecioHoras() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) =>
                    accumulator + pieza.horas * this.encargo!.precioHora,
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

    async addEncargo() {
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
                    cantidad: pieza.cantidad,
                    estado: pieza.estado,
                })),
                clienteId: this.encargo.cliente.id,
                precioHora: this.encargo.precioHora,
                gastosAdicionales: this.encargo.gastosAdicionales,
                precioTotal: this.encargo.precioTotal,
                img: this.encargo.img,
                estado: this.encargo.estado,
                userId: this.user.uid
            };
            await this.encargosService.addDoc(encargoDto);
        }
    }
    async uploadEncargo() {
        this.isEditing = false;
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
                    cantidad: pieza.cantidad,
                    estado: pieza.estado,
                })),
                clienteId: this.encargo.cliente.id,
                precioHora: this.encargo.precioHora,
                gastosAdicionales: this.encargo.gastosAdicionales,
                precioTotal: this.encargo.precioTotal,
                img: this.encargo.img,
                estado: this.encargo.estado,
                userId: this.user.uid
            };
            await this.encargosService.updateDoc(this.encargo.id, encargoDto);
        }
    }
    async deleteEncargo() {
        if (this.encargo) {
            await this.encargosService.deleteDoc(this.encargo.id);
            this.router.navigateByUrl("encargos");
        }
    }
}
