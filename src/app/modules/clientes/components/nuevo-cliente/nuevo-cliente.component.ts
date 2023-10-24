import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Input()
    clienteNuevo: Undefinable<Cliente>;

    @Input()
    indiceEdit: Undefinable<number>;

    constructor(
        private authService: AuthService,
        private clienteService: ClientesService

    ) { }

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
    async updateCliente() {
        try {
            if (this.clienteNuevo) {
                await this.clienteService.updateDoc(this.clienteNuevo.id, this.clienteNuevo);
                this.onGuardar.emit("");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
