import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";
import { ClientesService } from "../../pages/services/clientes.service";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";

@Component({
    selector: 'app-nuevo-cliente',
    templateUrl: './nuevo-cliente.component.html',
    styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent {

    @Output()
    onGuardar = new EventEmitter();

    clienteNuevo: Undefinable<Cliente>;

    constructor(
        private authService: AuthService,
        private clienteService: ClientesService

    ) {
        this.initClienteNuevo();
    }
    initClienteNuevo() {
        this.clienteNuevo = {
            id: "",
            nombre: "",
            userId: this.authService.getCurrentUser()?.uid ?? ""
        };
    }
    async addCliente() {
        try {
            if (this.clienteNuevo) {
                await this.clienteService.addDoc(this.clienteNuevo);
                this.onGuardar.emit("");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
