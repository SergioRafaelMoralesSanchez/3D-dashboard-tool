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
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";
import { EstadoEncargoEnum } from "../../../../shared/models/interfaces/estado-encargo.enum";
import { Preferencias } from "../../../../shared/models/interfaces/preferencias.interface";
import { ClientesService } from "../../../clientes/pages/services/clientes.service";
import { MaterialesService } from "../../../materiales/pages/services/materiales.service";
import { PreferenciasService } from "../../../preferencias/services/materiales.service";

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

    preferencias: Undefinable<Preferencias>;
    materialDefault: Undefinable<Material>;

    estadosEncargoEnum = EstadoEncargoEnum;
    estadosEncargo = [
        { key: EstadoEncargoEnum.Esperando, value: "Esperando" },
        { key: EstadoEncargoEnum.Preparado, value: "Preparado" },
        { key: EstadoEncargoEnum.EnProceso, value: "EnProceso" },
        { key: EstadoEncargoEnum.Impreso, value: "Impreso" },
        { key: EstadoEncargoEnum.Pagado, value: "Pagado" }
    ];

    estadosPiezaEnum = EstadoPiezaEnum;
    estadosPieza = [
        { key: EstadoPiezaEnum.Esperando, value: "Esperando" },
        { key: EstadoPiezaEnum.Preparado, value: "Preparado" },
        { key: EstadoPiezaEnum.EnProceso, value: "EnProceso" },
        { key: EstadoPiezaEnum.Impreso, value: "Impreso" }
    ];

    isEditing = false;
    piezasNuevas: Pieza[] = [];
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
        private authService: AuthService,
        private preferenciasService: PreferenciasService
    ) {
        this.user = this.authService.getCurrentUser()!;
    }
    async ngOnInit(): Promise<void> {
        const routes = this.activatedRoute.snapshot.params;
        if (routes["id"]) {
            this.encargoId = routes['id'];
            await this.getStoredEncargo();
            if (this.encargo?.nombre.length === 0) {
                this.isEditing = true;
            }
        }
        this.preferencias = await this.preferenciasService.getFirst();
    }

    async cambiarEstadoPieza(pieza: Pieza, estado: number) {
        if (this.encargo) {
            pieza.estado = estado;
            await this.uploadEncargo();
        }
    }

    async uploadEstadoEncargo(estadoKey: number) {
        if (this.encargo) {
            this.encargo.estado = estadoKey;
            this.encargo.piezas.forEach(pieza => pieza.estado = estadoKey);
            if (EstadoEncargoEnum.Pagado === estadoKey) {
                this.encargo.piezas.map(pieza => pieza.estado = EstadoPiezaEnum.Impreso);
                this.encargo.fechaFinalizacion = new Date();
            }
            await this.uploadEncargo();
        }
    }

    async activarModoEdicion() {
        this.isEditing = !this.isEditing;
        if (!this.clientes.length) {
            try {
                this.clientes = await this.clientesService.getAll();
            } catch (error) {
                console.error(error);
            }
        }
    }

    async getStoredEncargo() {
        try {
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
                        tasaFallo: material.tasaFallo,
                    }));
                    if (cliente && this.materiales) {
                        this.encargo = {
                            ...encargoDto,
                            dineroAdelantado: encargoDto.dineroAdelantado ?? 0,
                            iva: encargoDto.iva ?? this.preferencias?.iva ?? 0,
                            id: encargoDto.id,
                            piezas: this.regeneratePiezas(encargoDto, this.materialesMapped),
                            cliente,
                        };
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }

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

    openModalNuevaPieza(indice: Undefinable<number>) {
        if (this.encargo && indice !== undefined) {
            this.indiceEdit = indice;
            this.piezasNuevas = [{ ...this.encargo.piezas[this.indiceEdit] }];
        } else {
            this.indiceEdit = undefined;

            if (this.preferencias) {
                this.materialDefault = this.getMaterial(this.preferencias.idMaterialDefault);

                this.piezasNuevas.push(
                    {
                        nombre: "",
                        horas: 0,
                        gramos: 0,
                        estado: EstadoPiezaEnum.Esperando,
                        cantidad: 1,
                        material: this.materialDefault
                    }
                );
            }
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
        try {

            this.isEditing = false;
            if (this.encargo) {
                const encargoDto: EncargoDto = {
                    id: "",
                    fechaCreacion: this.encargo.fechaCreacion,
                    fechaFinalizacion: this.encargo.fechaFinalizacion,
                    iva: this.encargo.iva,
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
                    userId: this.user.uid,
                    dineroAdelantado: this.encargo.dineroAdelantado,
                };
                await this.encargosService.updateDoc(this.encargo.id, encargoDto);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async deleteEncargo() {
        try {
            if (this.encargo) {
                await this.encargosService.deleteDoc(this.encargo.id);
                this.router.navigateByUrl("encargos");
            }
        } catch (error) {
            console.error(error);
        }

    }

    getMaterial(id: string): Material {
        return this.materiales.find(material => material.id === id)!;
    }
}
