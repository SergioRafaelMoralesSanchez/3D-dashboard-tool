import { Component } from '@angular/core';
import { Cliente } from "../../../../shared/models/interfaces/cliente.interface";
import { ClientesService } from "../services/clientes.service";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
    clientes: Cliente[] = [];

    constructor(private clientesService: ClientesService) { }
    async ngOnInit(): Promise<void> {
        this.clientes = await this.clientesService.getAll();
        // await this.clientesService.addDoc({
        //     id: "",
        //     nombre: "Rafa impresoras"
        // });
        // await this.clientesService.updateDoc("WLNVgfEgVPeLTAVwkula", {
        //     nombre: "Rafa impresoras"
        // });
        // await this.clientesService.deleteDoc("WLNVgfEgVPeLTAVwkula")
    }
}
