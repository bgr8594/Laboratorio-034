import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatMenuComponent } from '../float-menu/float-menu.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FloatMenuComponent],
  exports:[FloatMenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentesModule { }
