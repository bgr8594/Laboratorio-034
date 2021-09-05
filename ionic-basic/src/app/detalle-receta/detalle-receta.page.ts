import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../recetas/receta.models';
import { RecetaService } from '../recetas/receta.service';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage implements OnInit {


  idReceta:number;
  receta:Receta;

  constructor(
  private ActivatedRoute:ActivatedRoute,
  private router: Router,
  private recetaService: RecetaService
  ) { }

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe(
      paraMap =>{
        this.idReceta =Number.parseInt(paraMap.get('idReceta'));
        console.log(this.idReceta);
        this.receta = this.recetaService.getRecetas(this.idReceta);
        console.log(this.idReceta);
      }
    );
  }

}
