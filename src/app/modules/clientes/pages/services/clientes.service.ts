import { Injectable } from '@angular/core';

import { BaseService } from "../../../../core/services/base-service.service";
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";
import { AuthService } from "../../../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseService<Cliente>{

  constructor(authService: AuthService) {
    super(authService);
    this.collectionName = "clientes";
  }

}
