import { Component, OnInit } from '@angular/core';
import { Lugar } from '../shared/lugar';
import { LugaresService } from '../service/lugares.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html'
})
export class DestinosPage implements OnInit {

  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  constructor(private lugaresServices: LugaresService) { }

  ngOnInit() {
    this.lugaresServices.getLugares(this.destinos);
  }

  altaLugar(){
    this.lugaresServices.altaLugar(this.lugar);
    this.lugaresServices.getLugares(this.destinos);
  }

}
