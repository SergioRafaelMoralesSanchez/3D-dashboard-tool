import { Injectable } from '@angular/core';

import { BaseService } from "../../../../core/services/base-service.service";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";

@Injectable({
    providedIn: 'root'
})
export class ClientesService extends BaseService<Cliente>{

    constructor() {
        super();
        this.collectionName = "clientes";
    }

}
