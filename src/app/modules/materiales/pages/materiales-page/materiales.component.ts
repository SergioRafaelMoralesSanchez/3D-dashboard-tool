import { Input, Component, OnInit, ViewChild } from '@angular/core';
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { MaterialesService } from "../services/materiales.service";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { AuthService } from "../../../../core/services/auth.service";
import { NuevoMaterialComponent } from "../../components/nuevo-material/nuevo-material.component";

@Component({
    selector: 'app-materiales',
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

    @ViewChild("nuevoMaterial") nuevoMaterialComponent!: NuevoMaterialComponent;

    @Input()
    materiales: Material[] = [];

    @Input()
    isComponente = false;

    materialNuevo: Undefinable<Material>;

    indiceEdit: Undefinable<number>;
    constructor(
        private materialesService: MaterialesService,
        private authService: AuthService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getMateriales();
    }

    loading = false;
    isNuevoMaterial = false;

    async getMateriales() {
        if (!this.isComponente) {
            this.isNuevoMaterial = false;
            this.loading = true;
            try {
                this.materiales = await this.materialesService.getAll();
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }

    }

    openModalNuevoMaterial(indice: Undefinable<number>) {
        if (indice !== undefined) {
            this.indiceEdit = indice;
            this.materialNuevo = { ...this.materiales[this.indiceEdit] };
            this.nuevoMaterialComponent.loadForm(this.materialNuevo);
        } else {
            this.indiceEdit = undefined;
            this.materialNuevo = {
                id: "",
                nombre: "",
                precioKg: 0,
                userId: this.authService.getCurrentUser()?.uid ?? "",
                tasaFallo: 0
            };
        }

    }

    async deleteMaterial(material: Material, index: number) {
        if (!this.isComponente) {
            try {
                await this.materialesService.deleteDoc(material.id);
                await this.getMateriales();
            } catch (error) {
                console.error(error);
            }
        } else {
            this.materiales.splice(index, 1);
        }

    }

} 