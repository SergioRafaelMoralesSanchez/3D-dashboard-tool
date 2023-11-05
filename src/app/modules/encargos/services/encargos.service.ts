import { Injectable } from '@angular/core';

import { BaseService } from "../../../core/services/base-service.service";
import { EncargoDto } from '../../../shared/models/interfaces/encargo.interface';
import { AuthService } from "../../../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EncargosService extends BaseService<EncargoDto>{

    constructor(authService: AuthService, private httpClient: HttpClient) {
        super(authService);
        this.collectionName = "encargos";
    }

    calculatePriceOnPrusa(file: Blob) {
        const url = "https://blog.prusa3d.com/wp-admin/admin-ajax.php";
        const formData = new FormData();

        formData.append("action", "prusa3d_parse_gcode");
        formData.append("gcode", file);
        return firstValueFrom(this.httpClient.post(url, formData));
    }
}
