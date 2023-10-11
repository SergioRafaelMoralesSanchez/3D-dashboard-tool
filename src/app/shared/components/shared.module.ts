import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EditSvgComponent } from '../../shared/components/svg/edit.svg';
import { TrashSvgComponent } from '../../shared/components/svg/trash.svg';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GearSvgComponent } from './svg/gear.svg';
import { RouterModule } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    EditSvgComponent,
    GearSvgComponent,
    TrashSvgComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    EditSvgComponent,
    GearSvgComponent,
    TrashSvgComponent
  ],
  imports: [FormsModule, CommonModule,RouterModule],
  providers: [AuthService]
})
export class SharedModule {}
