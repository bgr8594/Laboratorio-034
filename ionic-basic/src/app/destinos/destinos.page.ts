import { Component, OnInit } from '@angular/core';
import { Lugar } from '../shared/lugar';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html'
})
export class DestinosPage implements OnInit {

  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  constructor(private lugaresService: LugaresService) { }

  ngOnInit() {
    this.lugaresService.getLugares(this.destinos);
  }

  altaLugar(){
    this.lugaresService.altaLugar(this.lugar);
    this.lugaresService.getLugares(this.destinos);
  }

}
