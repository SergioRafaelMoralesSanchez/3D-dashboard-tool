import { Component, OnInit } from '@angular/core';
import { Material } from "../../../../shared/models/interfaces/material.interface";
import { MaterialesService } from "../services/materiales.service";

@Component({
    selector: 'app-materiales',
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
    materiales: Material[] = [];

    constructor(private materialesService: MaterialesService) { }

    async ngOnInit(): Promise<void> {
        this.materiales = await this.materialesService.getAll();
    }

} 