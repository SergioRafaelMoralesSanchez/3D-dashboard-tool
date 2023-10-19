import { Component, OnInit } from '@angular/core';
import { EncargosService } from 'src/app/modules/encargos/services/encargos.service';
import { EncargoDto } from 'src/app/shared/models/interfaces/encargo.interface';

@Component({
    selector: 'app-encargos',
    templateUrl: './encargos.component.html',
    styleUrls: ['./encargos.component.css']
})
export class EncargosComponent implements OnInit {

    encargos: EncargoDto[] = [];
    loading = false;
    constructor(
        private encargosService: EncargosService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getEncargos();
    }

    async getEncargos() {
        try {
            this.loading = true;
            this.encargos = await this.encargosService.getAll();
            this.loading = false;
        } catch (error) {
            console.error(error);
        }
    }
}
