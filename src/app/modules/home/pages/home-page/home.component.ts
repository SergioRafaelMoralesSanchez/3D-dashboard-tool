import { Component, OnInit } from '@angular/core';
import { EncargosService } from 'src/app/modules/encargos/services/encargos.service';
import { EncargoDto } from 'src/app/shared/models/interfaces/encargo.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    encargos: EncargoDto[] = [];

    constructor(private encargosService: EncargosService) { }
    async ngOnInit(): Promise<void> {

        // this.encargos = await this.encargosService.getAll();
        // await this.addEncargo();
    }
}
