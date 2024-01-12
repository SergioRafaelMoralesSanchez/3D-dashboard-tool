import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";
import { ClientesService } from "../../pages/services/clientes.service";

@Component({
    selector: 'app-nuevo-cliente',
    templateUrl: './nuevo-cliente.component.html',
    styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent {

    clienteForm: FormGroup = new FormGroup({
        nombre: new FormControl("", {
            validators: Validators.required
        })
    });

    @Output()
    onGuardar = new EventEmitter();

    @Input()
    clienteNuevo: Undefinable<Cliente>;

    @Input()
    indiceEdit: Undefinable<number>;

    constructor(private clienteService: ClientesService) { }

    loadForm(cliente: Cliente): void {
        this.clienteForm.setValue({ nombre: cliente.nombre });
    }

    async addCliente() {
        try {
            if (this.clienteNuevo) {
                await this.clienteService.addDoc({
                    ...this.clienteNuevo,
                    nombre: this.clienteForm.value["nombre"]
                });
                this.onGuardar.emit("");
            }
        } catch (error) {
            console.error(error);
        }
    }
    async updateCliente() {
        try {
            if (this.clienteNuevo) {
                await this.clienteService.updateDoc(this.clienteNuevo.id, {
                    ...this.clienteNuevo,
                    nombre: this.clienteForm.value["nombre"]
                });
                this.onGuardar.emit("");
            }
        } catch (error) {
            console.error(error);
        }
    }

}
