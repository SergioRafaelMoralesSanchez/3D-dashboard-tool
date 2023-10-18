import { Component, OnInit } from '@angular/core';
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { MaterialesService } from "../services/materiales.service";

@Component({
    selector: 'app-materiales',
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
    materiales: Material[] = [];

    constructor(
        private materialesService: MaterialesService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getMateriales();
    }

    loading = false;
    isNuevoMaterial = false;

    async getMateriales() {
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

    async deleteMaterial(material: Material) {
        try {
            await this.materialesService.deleteDoc(material.id);
            await this.getMateriales();
        } catch (error) {
            console.error(error);
        }

    }

} 