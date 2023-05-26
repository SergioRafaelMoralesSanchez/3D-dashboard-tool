import { Component, OnInit } from '@angular/core';
import { EncargosService } from 'src/app/services/encargos.service';
import { Encargo } from 'src/app/shared/models/interfaces/encargo.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  encargos: Encargo[] = []

  constructor(private encargosService: EncargosService) { }
  ngOnInit(): void {
    this.encargos = this.encargosService.getAll()

  }
}
