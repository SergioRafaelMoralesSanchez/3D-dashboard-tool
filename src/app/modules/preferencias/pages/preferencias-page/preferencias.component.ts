import { Component, OnInit } from '@angular/core';
import { Preferencias } from "../../../../shared/models/interfaces/preferencias.interface";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { AuthService } from "../../../../core/services/auth.service";
import { PreferenciasService } from "../../services/materiales.service";
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { MaterialesService } from "../../../materiales/pages/services/materiales.service";
import { LocalUser } from "../../../../shared/models/interfaces/auth/local-user.interface";

@Component({
    selector: 'app-preferencias',
    templateUrl: './preferencias.component.html',
    styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {
    loading = false;
    materiales: Material[] = [];
    preferencias: Undefinable<Preferencias>;

    user: LocalUser;
    constructor(
        private authService: AuthService,
        private preferenciasService: PreferenciasService,
        private materialesService: MaterialesService
    ) {

        this.user = this.authService.getCurrentUser()!;

    }
    async ngOnInit(): Promise<void> {
        await this.getPreferencias();
        await this.getMateriales();
    }
    
    getMaterial(id: string): Material {
        return this.materiales.find(material => material.id === id)!;
    }
    async getMateriales() {
        try {
            this.materiales = await this.materialesService.getAll();
        } catch (error) {
            console.error(error);
        }
    }

    async getPreferencias() {
        try {
            this.preferencias = await this.preferenciasService.getFirst();
            if (this.preferencias === undefined) {
                this.preferencias = {
                    id: "",
                    precioHora: 0.3,
                    calculoPrecio: [],
                    idMaterialDefault: "",
                    iva: 21,
                    userId: this.user.uid
                };
                await this.addPreferencias();
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }
    }

    async addPreferencias() {
        if (this.preferencias) {
            try {
                this.preferencias = await this.preferenciasService.addDoc(this.preferencias);
            } catch (error) {
                console.error(error);
            }
        }
    }
    async updatePreferencias() {
        if (this.preferencias) {
            try {
                this.loading = true;
                await this.preferenciasService.updateDoc(this.preferencias.id, this.preferencias);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }
    }
}
