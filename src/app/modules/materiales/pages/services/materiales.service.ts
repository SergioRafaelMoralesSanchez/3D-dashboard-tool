import { Injectable } from "@angular/core";
import { AuthService } from "../../../../core/services/auth.service";
import { BaseService } from "../../../../core/services/base-service.service";
import { Material } from "../../../../shared/models/interfaces/material.interface";

@Injectable()
export class MaterialesService extends BaseService<Material> {
    constructor(authService: AuthService) {
        super(authService);
        this.collectionName = "materiales";
    }

}
