import { Component, OnInit } from '@angular/core';
import { EncargosService } from 'src/app/modules/encargos/services/encargos.service';
import { EncargoDto } from 'src/app/shared/models/interfaces/encargo.interface';
import { ClientesService } from "../../../clientes/pages/services/clientes.service";

@Component({
    selector: 'app-encargos',
    templateUrl: './encargos.component.html',
    styleUrls: ['./encargos.component.css']
})
export class EncargosComponent implements OnInit {

    encargos: EncargoDto[] = [];

    constructor(
        private encargosService: EncargosService,
        private clientesService: ClientesService
    ) { }

    async ngOnInit(): Promise<void> {
        this.encargos = await this.encargosService.getAll();
    }
}