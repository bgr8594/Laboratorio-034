import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFlotanteComponent } from '../menu-flotante/menu-flotante.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MenuFlotanteComponent],
  exports:[MenuFlotanteComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentesModule { }
