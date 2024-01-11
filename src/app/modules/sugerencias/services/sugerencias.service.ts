import { Injectable } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { BaseService } from "../../../core/services/base-service.service";
import { Sugerencia } from "../../../shared/models/interfaces/sugerencia.interface";

@Injectable()
export class SugerenciasService extends BaseService<Sugerencia> {
    constructor(authService: AuthService) {
        super(authService);
        this.collectionName = "sugerencias";
    }

}
