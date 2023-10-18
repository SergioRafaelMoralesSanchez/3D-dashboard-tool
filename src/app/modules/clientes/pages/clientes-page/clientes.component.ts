import { Component } from '@angular/core';
import { Cliente, ClienteDto } from "../../../../shared/models/interfaces/cliente.interface";
import { EncargoDto } from "../../../../shared/models/interfaces/encargo.interface";
import { EstadoEncargoEnum } from "../../../../shared/models/interfaces/estado-encargo.enum";
import { EncargosService } from "../../../encargos/services/encargos.service";
import { ClientesService } from "../services/clientes.service";
import { AuthService } from "../../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

    clientes: ClienteDto[] = [];
    encargos: EncargoDto[] = [];

    loading = false;
    isNuevoCliente = false;

    constructor(
        private clientesService: ClientesService,
        private encargosService: EncargosService,
        private router: Router,
        private authService: AuthService
    ) { }
    async ngOnInit(): Promise<void> {
        await this.getMappedClients();
    }

    async getMappedClients() {

        this.isNuevoCliente = false;
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
        const encargoDto: EncargoDto = {
            "fechaCreacion": new Date(),
            "precioHora": 0.3,
            "gastosAdicionales": [],
            "nombre": "",
            "estado": 2,
            "clienteId": cliente.id,
            "precioTotal": 0,
            "observaciones": "",
            "piezas": [],
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/3DBenchy.png/1024px-3DBenchy.png",
            "fechaFinalizacion": null,
            "id": "",
            userId: this.authService.user?.uid ?? ""
        };
        const documentRef = await this.encargosService.addDoc(encargoDto);
        if (documentRef) this.router.navigateByUrl("encargos/" + documentRef.id);
    }
}
