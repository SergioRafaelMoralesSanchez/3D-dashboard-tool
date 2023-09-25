import { Injectable } from '@angular/core';

import { BaseService } from "../../../core/services/base-service.service";
import { EncargoDto } from '../../../shared/models/interfaces/encargo.interface';

@Injectable({
    providedIn: 'root'
})
export class EncargosService extends BaseService<EncargoDto>{

    constructor() {
        super();
        this.collectionName = "encargos";
    }

}
