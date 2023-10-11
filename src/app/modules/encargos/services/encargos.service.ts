import { Injectable } from '@angular/core';

import { BaseService } from "../../../core/services/base-service.service";
import { EncargoDto } from '../../../shared/models/interfaces/encargo.interface';
import { AuthService } from "../../../core/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class EncargosService extends BaseService<EncargoDto>{

    constructor(authService: AuthService) {
        super(authService);
        this.collectionName = "encargos";
    }

}
