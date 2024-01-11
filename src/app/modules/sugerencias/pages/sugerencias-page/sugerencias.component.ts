import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SugerenciasService } from "../../services/sugerencias.service";
@Component({
    selector: 'app-sugerencias',
    templateUrl: './sugerencias.component.html',
    styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent {
    enviado = false;
    sugerenciaForm: FormGroup = new FormGroup({
        nombre: new FormControl("", {
            validators: [
                Validators.required,
            ]
        }),
        email: new FormControl("", {
            validators: [
                Validators.required,
                Validators.email,
            ]
        }),
        sugerencia: new FormControl("", {
            validators: [
                Validators.required
            ]
        }),
    });

    constructor(
        private sugerenciasService: SugerenciasService
    ) { }

    sentSugenrencia() {
        if (this.sugerenciaForm.valid) {
            this.sugerenciasService.addDoc({
                id: "",
                nombre: this.sugerenciaForm.value["nombre"],
                email: this.sugerenciaForm.value["email"],
                sugerencia: this.sugerenciaForm.value["sugerencia"],
            });
            this.enviado = true;

            setTimeout(() => {
                this.enviado = false;
            }, 2000);
            this.sugerenciaForm.reset();
        }
    }
}
