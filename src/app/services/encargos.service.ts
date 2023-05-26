import { Injectable } from '@angular/core';
import { ENCARGOSDB } from '../shared/models/encargosdb';
import { Encargo } from '../shared/models/interfaces/encargo.interface';
import { Undefinable } from '../shared/models/helpers/Undefinable.interface';

@Injectable({
  providedIn: 'root'
})
export class EncargosService {

  getAll(): Encargo[] {
    return ENCARGOSDB
  }

  getById(id: number): Undefinable<Encargo> {
    return ENCARGOSDB.find(encargo => encargo.id === id)
  }
}
