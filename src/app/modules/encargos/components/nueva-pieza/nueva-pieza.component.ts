import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { Pieza } from "../../../../shared/models/interfaces/pieza.interface";
import { EstadoEnum } from "../../../../shared/models/interfaces/estado.enum";
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { Encargo } from "../../../../shared/models/interfaces/encargo.interface";

@Component({
    selector: 'app-nueva-pieza',
    templateUrl: './nueva-pieza.component.html',
    styleUrls: ['./nueva-pieza.component.css']
})
export class NuevaPiezaComponent {
    @Input()
    materiales: Material[] = [];

    @Input()
    piezasNuevas: Pieza[] = [];

    @Input()
    encargo: Undefinable<Encargo>;

    @Output()
    uploadEncargo = new EventEmitter();

    @Output()
    encargoChange = new EventEmitter<Encargo>();

    @Input()
    indiceEdit: Undefinable<number>;

    cargaVaciaFicheros() {
        this.indiceEdit = undefined;
        this.piezasNuevas = [
            {
                nombre: "",
                horas: 0,
                gramos: 0,
                estado: EstadoEnum.Esperando,
                material: this.materiales[0]
            } as Pieza
        ];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file_changed(event: any) {
        this.piezasNuevas = [];
        const jamon = event as EventFile;
        for (const file of jamon.target.files) {
            //Jamon_40g_1h22m.gcode
            const [nombre, gramos, tiempo] = file.name.replace('.gcode', '').split('_');
            let hour = 0, min = 0;
            if (tiempo.includes("h")) {
                hour = Number(tiempo.replace('m', '').split('h')[0]);
                min = Number(tiempo.replace('m', '').split('h')[1]);
            } else {
                min = Number(tiempo.replace('m', ''));
            }
            this.piezasNuevas.push({
                nombre,
                horas: Number((hour + min / 60).toFixed(2)),
                gramos: Number(gramos.replace('g', '')),
                material: this.materiales[0],
                estado: EstadoEnum.Esperando
            });
        }
    }
    addPiezas() {
        console.log("🚀 ~ file: nueva-pieza.component.ts:69 ~ NuevaPiezaComponent ~ addPiezas ~ this.encargo:", this.encargo);
        if (this.piezasNuevas && this.encargo) {
            for (const fichero of this.piezasNuevas) {
                if (this.indiceEdit) {
                    this.encargo.piezas[this.indiceEdit] = {
                        ...fichero,
                        material: this.getMaterial(fichero.material.id)
                    };

                } else {
                    this.encargo.piezas.push({
                        ...fichero,
                        material: this.getMaterial(fichero.material.id)
                    });
                }
            }
            this.encargoChange.emit(this.encargo);
            this.uploadEncargo.emit();
            this.cargaVaciaFicheros();
        }
    }

    getMaterial(id: string): Material {
        return this.materiales.find(material => material.id === id)!;
    }
    deletePieza(index: number) {
        this.piezasNuevas.splice(index, 1);
        if (!this.piezasNuevas.length) {
            this.cargaVaciaFicheros();
        }
    }
}

interface EventFile {
    target: {
        files: FileGcode[]
    }
}
interface FileGcode {
    lastModified: string
    lastModifiedDate: string
    name: string
    size: number
    type: string
    webkitRelativePath: string
} 