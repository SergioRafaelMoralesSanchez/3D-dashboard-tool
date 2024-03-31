import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class NuevaPiezaComponent implements OnInit {

    @Input()
    materiales: Material[] = [];

    @Input()
    materialDefault: Undefinable<Material>;

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

    ngOnInit(): void {
        this.materialDefault = this.materiales[0];
    }

    copyToClipboard(value: string) {
        alert("Texto Copiado al porta papeles");
        navigator.clipboard.writeText(value);
    }
    addPiezaNueva() {
        if (this.materialDefault) {

            this.piezasNuevas.push(
                {
                    nombre: "",
                    horas: 0,
                    gramos: 0,
                    estado: EstadoPiezaEnum.Esperando,
                    cantidad: 1,
                    material: this.materialDefault
                }
            );
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file_changed(event: any) {
        if (this.materialDefault) {
            const eventFile = event as EventFile;
            this.piezasNuevas = [];
            for (const file of eventFile.target.files) {
                //eventFile_40g_1h22m.gcode
                const nombreFichero = file.name.replace('.gcode', '');
                let nombre = "", gramos = "", tiempo = "";
                if (nombreFichero.split("_").length === 3) {
                    [nombre, gramos, tiempo] = nombreFichero.split('_');
                } else {
                    const ArrayFichero = nombreFichero.split('_');
                    nombre = ArrayFichero.slice(0, -2).join("_");
                    tiempo = ArrayFichero.slice(-1)[0];
                    gramos = ArrayFichero.slice(-2, ArrayFichero.length - 1)[0];
                }
                let hour = 0, min = 0, days = 0;
                const tiempoSplit = tiempo.replace("d", "_").replace("h", "_").replace("m", "").split("_");
                if (tiempo.includes("d")) {
                    days = Number(tiempoSplit[0]);
                    hour = Number(tiempoSplit[1]);
                    min = Number(tiempoSplit[2]);
                } else if (tiempo.includes("h")) {
                    hour = Number(tiempoSplit[0]);
                    min = Number(tiempoSplit[1]);
                } else {
                    min = Number(tiempoSplit[0]);
                }
                this.piezasNuevas.push({
                    nombre,
                    horas: Number((days * 24 + hour + min / 60).toFixed(2)),
                    gramos: Number(gramos.replace('g', '')),
                    material: this.materialDefault,
                    cantidad: 1,
                    estado: EstadoPiezaEnum.Esperando
                });
                // } else {
                //     this.piezasNuevas.push(
                //         {
                //             nombre: "",
                //             horas: 0,
                //             gramos: 0,
                //             estado: EstadoPiezaEnum.Esperando,
                //             cantidad: 1,
                //             material: this.materialDefault
                //         }
                //     );
                //     console.error("formato incorrecto");
                // }
            }
        }
    }

    addPiezas() {
        if (this.piezasNuevas && this.encargo) {
            for (const fichero of this.piezasNuevas) {
                if (this.indiceEdit !== undefined) {
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
        return this.materiales.find(material => material.id === id)!;
    }

    deletePieza(index: number) {
        this.piezasNuevas.splice(index, 1);
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
