import { Injectable } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { BaseService } from "../../../core/services/base-service.service";
import { Preferencias } from "../../../shared/models/interfaces/preferencias.interface";

@Injectable()
export class PreferenciasService extends BaseService<Preferencias> {
    constructor(authService: AuthService) {
        super(authService);
        this.collectionName = "preferencias";
    }

}
