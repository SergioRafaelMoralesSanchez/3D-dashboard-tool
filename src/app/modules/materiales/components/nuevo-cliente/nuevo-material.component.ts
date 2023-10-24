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
    materialNuevo: Undefinable<Material>;

    @Input()
    indiceEdit: Undefinable<number>;

    constructor(
        private materialesService: MaterialesService
    ) { }

    async addMaterial() {
        try {
            if (this.materialNuevo) {
                await this.materialesService.addDoc(this.materialNuevo);
                this.onGuardar.emit("");
            }
        } catch (error) {
            console.error(error);
        }
    }
    async updateMaterial() {
        try {
            if (this.materialNuevo) {
                await this.materialesService.updateDoc(this.materialNuevo.id, this.materialNuevo);
                this.onGuardar.emit("");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
