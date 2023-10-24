import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EncargoCardComponent } from '../../shared/components/encargo-card/encargo-card.component';
import { SharedModule } from '../../shared/components/shared.module';
import { MaterialesService } from '../materiales/pages/services/materiales.service';
import { GastoAdicionalComponent } from './components/gasto-adicional/gasto-adicional.component';
import { NuevaPiezaComponent } from './components/nueva-pieza/nueva-pieza.component';
import { EncargosRoutingModule } from './encargos-routing.module';
import { EncargoComponent } from './pages/encargo-page/encargo.component';
import { EncargosComponent } from './pages/encargos-page/encargos.component';

@NgModule({
  declarations: [
    EncargoComponent,
    EncargosComponent,
    GastoAdicionalComponent,
    NuevaPiezaComponent
  ],
  exports: [
    GastoAdicionalComponent,
    NuevaPiezaComponent
  ],
  imports: [
    EncargosRoutingModule,
    FormsModule,
    CommonModule,
    EncargoCardComponent,
    SharedModule
  ],
  providers: [MaterialesService]
})
export class EncargosModule {}
