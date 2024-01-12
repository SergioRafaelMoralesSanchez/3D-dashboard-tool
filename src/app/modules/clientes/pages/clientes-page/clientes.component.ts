import { Component, ViewChild } from '@angular/core';
import { Cliente, ClienteDto } from "../../../../shared/models/interfaces/cliente.interface";
import { EncargoDto } from "../../../../shared/models/interfaces/encargo.interface";
import { EstadoEncargoEnum } from "../../../../shared/models/interfaces/estado-encargo.enum";
import { EncargosService } from "../../../encargos/services/encargos.service";
import { ClientesService } from "../services/clientes.service";
import { AuthService } from "../../../../core/services/auth.service";
import { Router } from "@angular/router";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { PreferenciasService } from "../../../preferencias/services/materiales.service";
import { NuevoClienteComponent } from "../../components/nuevo-cliente/nuevo-cliente.component";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

    @ViewChild("nuevoCliente") nuevoClienteComponent!: NuevoClienteComponent;

    clientes: ClienteDto[] = [];
    encargos: EncargoDto[] = [];

    loading = false;

    clienteNuevo: Undefinable<Cliente>;
    indiceEdit: Undefinable<number>;

    constructor(
        private clientesService: ClientesService,
        private encargosService: EncargosService,
        private preferenciasService: PreferenciasService,
        private router: Router,
        private authService: AuthService
    ) { }
    async ngOnInit(): Promise<void> {
        await this.getMappedClients();
    }

    async getMappedClients() {

        this.loading = true;
        try {
            await this.getEncargos();
            this.clientes = (await this.clientesService.getAll()).map((cliente: Cliente) => {
                const encargosCliente = this.encargos.filter(encargo => encargo.clienteId === cliente.id);
                return {
                    ...cliente,
                    encargosActivos: this.getEncargosActivos(encargosCliente),
                    encargosFinalizados: this.getEncargosFinalizados(encargosCliente),
                    dineroTotal: this.getDineroTotal(encargosCliente),
                };
            });
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }
    }

    openModalNuevoCliente(indice: Undefinable<number>) {
        if (indice !== undefined) {
            this.indiceEdit = indice;
            this.clienteNuevo = { ...this.clientes[this.indiceEdit] };
            this.nuevoClienteComponent.loadForm(this.clienteNuevo);
        } else {
            this.indiceEdit = undefined;
            this.clienteNuevo = {
                id: "",
                nombre: "",
                userId: this.authService.getCurrentUser()?.uid ?? ""
            };
        }

    }

    getEncargosActivos(encargosCliente: EncargoDto[]) {
        const encargosActivos = encargosCliente.reduce((accumulator, encargo: EncargoDto) => {
            if (encargo.estado !== EstadoEncargoEnum.Pagado) accumulator++;
            return accumulator;
        }, 0);
        return encargosActivos;
    }

    getEncargosFinalizados(encargosCliente: EncargoDto[]) {
        const encargosFinalizados = encargosCliente.reduce((accumulator, encargo: EncargoDto) => {
            if (encargo.estado === EstadoEncargoEnum.Pagado) accumulator++;
            return accumulator;
        }, 0);
        return encargosFinalizados;
    }

    getDineroTotal(encargosCliente: EncargoDto[]) {
        const dinetoTotal = encargosCliente.reduce((accumulator, encargo: EncargoDto) => accumulator + encargo.precioTotal, 0);
        return dinetoTotal;
    }

    async getEncargos() {
        if (!this.encargos.length) {

            try {
                this.encargos = (await this.encargosService.getAll());
            } catch (error) {
                console.error(error);
            }
        }
    }
    async deleteCliente(cliente: Cliente) {
        try {
            await this.clientesService.deleteDoc(cliente.id);
            await this.getMappedClients();
        } catch (error) {
            console.error(error);
        }

    }

    async nuevoEncargo(cliente: Cliente) {
        try {
            const preferencias = await this.preferenciasService.getFirst();
            const encargoDto: EncargoDto = {
                fechaCreacion: new Date(),
                iva: preferencias?.iva ?? 21,
                precioHora: preferencias?.precioHora ?? 0.3,
                gastosAdicionales: [],
                nombre: "",
                estado: EstadoEncargoEnum.Esperando,
                clienteId: cliente.id,
                precioTotal: 0,
                observaciones: "",
                piezas: [],
                img: "",
                fechaFinalizacion: null,
                id: "",
                userId: this.authService.user?.uid ?? "",
                dineroAdelantado: 0
            };
            const documentRef = await this.encargosService.addDoc(encargoDto);
            if (documentRef) this.router.navigateByUrl("encargos/" + documentRef.id);
        } catch (error) {
            console.error(error);
        }
    }
}
