import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GastoAdicional } from "../../../../shared/models/interfaces/gastoAdicional.interface";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { Encargo } from "../../../../shared/models/interfaces/encargo.interface";

@Component({
    selector: 'app-gasto-adicional',
    templateUrl: './gasto-adicional.component.html',
    styleUrls: ['./gasto-adicional.component.css']
})
export class GastoAdicionalComponent {

    gastoAdicional: GastoAdicional;

    constructor() {
        this.gastoAdicional = {
            nombre: "",
            precio: 0
        };
    }
    @Input()
    encargo: Undefinable<Encargo>;

    @Output()
    encargoChange = new EventEmitter<Encargo>();

    @Output()
    uploadEncargo = new EventEmitter();

    limpiarGastoAdicional(): void {
        this.gastoAdicional = {} as GastoAdicional;
    }

    addGasto() {
        if (this.gastoAdicional && this.encargo) {
            this.encargo.gastosAdicionales.push({ ...this.gastoAdicional });
            this.encargoChange.emit(this.encargo);
        }
        this.uploadEncargo.emit();
        this.limpiarGastoAdicional();
    }
}
