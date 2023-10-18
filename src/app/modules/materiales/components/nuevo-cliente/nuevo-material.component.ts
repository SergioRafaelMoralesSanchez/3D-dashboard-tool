import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";
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

    materialNuevo: Undefinable<Material>;

    constructor(
        private authService: AuthService,
        private materialesService: MaterialesService

    ) {
        this.initMaterialNuevo();
    }

    initMaterialNuevo() {
        this.materialNuevo = {
            id: "",
            nombre: "",
            precioKg: 0,
            userId: this.authService.getCurrentUser()?.uid ?? ""
        };
    }
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
}
