import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';
import { MATERIALESDB } from 'src/app/shared/models/encargosdb';
import { Undefinable } from 'src/app/shared/models/helpers/Undefinable.interface';
import { Encargo } from 'src/app/shared/models/interfaces/encargo.interface';
import { EstadoEnum } from 'src/app/shared/models/interfaces/estado.enum';
import { GastoAdicional } from 'src/app/shared/models/interfaces/gastoAdicional.interface';
import { Material } from 'src/app/shared/models/interfaces/material.interface';
import { Pieza } from 'src/app/shared/models/interfaces/pieza.interface';

@Component({
    selector: 'app-encargo',
    templateUrl: './encargo.component.html',
    styleUrls: ['./encargo.component.css']
})
export class EncargoComponent {
    estados = EstadoEnum;
    encargoId: Undefinable<number>;
    encargo: Undefinable<Encargo>;
    materiales = MATERIALESDB;
    ficherosNuevos: Pieza[] = [];
    materialPredeterminado = MATERIALESDB[0];
    gastoAdicional: Undefinable<GastoAdicional>;

    constructor(
        activatedRoute: ActivatedRoute,
        private encargosService: EncargosService
    ) {
        activatedRoute.params.subscribe(parametros => {
            if (parametros['id']) {
                this.encargoId = parametros['id'];
                this.encargo = encargosService.getById(Number(parametros['id']));
            } else {
                this.encargo = {} as Encargo;
            }
        });
        this.cargaVaciaFicheros();
        this.limpiarGastoAdicional();
    }

    cargaVaciaFicheros() {
        this.ficherosNuevos = [
            {
                nombre: "",
                horas: 0,
                gramos: 0,
                estado: EstadoEnum.Esperando,
                material: this.materialPredeterminado
            } as Pieza
        ];
    }

    calculoPrecioPieza(pieza: Pieza) {
        if (this.encargo) {
            return (
                pieza.horas * this.encargo.precioHora + this.calculoMaterialPieza(pieza)
            );
        }
        return 0;
    }

    file_changed(event: any) {
        this.ficherosNuevos = [];
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
            this.ficherosNuevos.push({
                nombre,
                horas: Number((hour + min / 60).toFixed(2)),
                gramos: Number(gramos.replace('g', '')),
                material: this.materialPredeterminado,
                estado: EstadoEnum.Esperando
            });
        }
    }
    limpiarGastoAdicional(): void {
        this.gastoAdicional = {} as GastoAdicional;
    }
    getMaterial(id: number): Undefinable<Material> {
        return this.materiales.find(material => material.id === id);
    }
    addPiezas() {
        if (this.ficherosNuevos) {
            for (const fichero of this.ficherosNuevos) {
                this.encargo?.piezas.push({
                    ...fichero,
                    material: this.getMaterial(fichero.material.id) ?? this.materialPredeterminado
                });
            }

            this.cargaVaciaFicheros();
        }
    }
    deletePieza(index: number) {
        this.ficherosNuevos.splice(index, 1);
        if (!this.ficherosNuevos.length) {
            this.cargaVaciaFicheros();
        }
    }
    deletePiezaFromEncargo(index: number) {
        this.encargo?.piezas.splice(index, 1);
    }

    totalHoras() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) => accumulator + pieza.horas,
                0
            );
        }
        return 0;
    }
    totalGramos() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) => accumulator + pieza.gramos,
                0
            );
        }
        return 0;
    }
    totalPrecio() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) =>
                    accumulator + this.calculoPrecioPieza(pieza),
                0
            );
        }
        return 0;
    }

    totalEncargo() {
        if (this.encargo) {

            return this.totalPrecio() + this.encargo.gastosAdicionales.reduce(
                (accumulator: number, gasto: GastoAdicional) => accumulator + gasto.precio, 0);
        }
        return 0;
    }
    totalPrecioPieza() {
        if (this.encargo) {
            return this.encargo.piezas.reduce(
                (accumulator, pieza: Pieza) =>
                    accumulator + this.calculoMaterialPieza(pieza),
                0
            );
        }
        return 0;
    }

    calculoMaterialPieza(pieza: Pieza) {
        return (pieza.material.precioKg / 1000) * pieza.gramos;
    }

    dropItLikeItsHot(jamon: Event) {
        console.log(jamon);
    }

    addGasto() {
        if (this.gastoAdicional) {
            this.encargo?.gastosAdicionales.push({ ...this.gastoAdicional });
        }
        this.limpiarGastoAdicional();
    }
    editarGasto(indice: number) {
        this.limpiarGastoAdicional();
        this.gastoAdicional = this.encargo?.gastosAdicionales[indice];
    }
    eliminarGasto(indice: number) {
        this.encargo?.gastosAdicionales.splice(indice, 1);
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