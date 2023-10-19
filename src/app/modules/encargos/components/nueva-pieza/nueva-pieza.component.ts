import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Undefinable } from "../../../../shared/models/helpers/Undefinable.interface";
import { Encargo } from "../../../../shared/models/interfaces/encargo.interface";
import { EstadoPiezaEnum } from "../../../../shared/models/interfaces/estado-pieza.enum";
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { Pieza } from "../../../../shared/models/interfaces/pieza.interface";

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

    addPiezaNueva() {
        this.piezasNuevas.push(
            {
                nombre: "",
                horas: 0,
                gramos: 0,
                estado: EstadoPiezaEnum.Esperando,
                cantidad: 1,
                material: this.materiales[0]
            }
        );
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
                cantidad: 1,
                estado: EstadoPiezaEnum.Esperando
            });
        }
    }
    addPiezas() {
        if (this.piezasNuevas && this.encargo) {
            for (const fichero of this.piezasNuevas) {
                if (this.indiceEdit) {
                    this.encargo.piezas[this.indiceEdit] = {
                        ...fichero,
                        material: this.getMaterial(fichero.material.id)
                    };

                } else {
                    for (let cantidad = 0; cantidad < fichero.cantidad; cantidad++) {
                        this.encargo.piezas.push({
                            ...fichero,
                            material: this.getMaterial(fichero.material.id)
                        });
                    }
                }
            }
            this.encargoChange.emit(this.encargo);
            this.uploadEncargo.emit();
        }
    }

    getMaterial(id: string): Material {
        console.log("🚀 ~ file: nueva-pieza.component.ts:108 ~ NuevaPiezaComponent ~ getMaterial ~ id:", id);
        return this.materiales.find(material => material.id === id)!;
    }

    deletePieza(index: number) {
        this.piezasNuevas.splice(index, 1);
    }

    cambioMaterialPieza(pieza: Pieza, materialId: string) {
        pieza.material = this.getMaterial(materialId);
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