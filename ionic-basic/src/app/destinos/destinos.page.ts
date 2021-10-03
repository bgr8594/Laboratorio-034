import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/shared/lugar';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
})
export class DestinosPage implements OnInit {
lugar:Lugar= new Lugar();
destinos:any[]=[];

  constructor(private lugaresService: LugaresService) { }

  ngOnInit() {
    this.lugaresService.getLugares(this.destinos);
  }

  altaLugar(){
    this.lugaresService.altalugar(this.lugar);
    this.lugaresService.getLugares(this.destinos);
  }
}
