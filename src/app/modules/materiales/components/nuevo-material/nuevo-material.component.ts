import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { MaterialesService } from "../../pages/services/materiales.service";

@Component({
    selector: 'app-nuevo-material',
    templateUrl: './nuevo-material.component.html',
    styleUrls: ['./nuevo-material.component.css']
})
export class NuevoMaterialComponent {

    @Output()
    onGuardar = new EventEmitter();

    @Input()
    isComponente = false;

    @Input()
    materialNuevo: Undefinable<Material>;

    @Input()
    indiceEdit: Undefinable<number>;

    @Input()
    materiales: Material[] = [];

    @Output()
    materialesChange = new EventEmitter<Material[]>();

    constructor(
        private materialesService: MaterialesService
    ) { }

    async addMaterial() {
        if (this.materialNuevo) {
            if (!this.isComponente) {
                try {
                    await this.materialesService.addDoc(this.materialNuevo);
                    this.onGuardar.emit("");
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.materiales.push(this.materialNuevo);
                this.materialesChange.emit(this.materiales);
            }
        }
    }
    async updateMaterial() {
        if (this.materialNuevo) {
            if (!this.isComponente) {
                try {
                    await this.materialesService.updateDoc(this.materialNuevo.id, this.materialNuevo);
                    this.onGuardar.emit("");
                } catch (error) {
                    console.error(error);
                }
            } else if (this.indiceEdit !== undefined) {
                this.materiales[this.indiceEdit] = this.materialNuevo;
                this.materialesChange.emit(this.materiales);
            }
        }

    }
}
