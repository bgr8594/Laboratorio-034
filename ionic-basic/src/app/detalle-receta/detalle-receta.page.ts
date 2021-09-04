import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Receta } from '../recetas/receta.model';
import { RecetaService } from '../recetas/receta.service';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage implements OnInit {

  idReceta: number;
  receta: Receta;
  constructor(
    private activatedRoute: ActivatedRoute,
     private router: Router,
     private recetaService: RecetaService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paraMap =>{
        this.idReceta = Number.parseInt(paraMap.get('idReceta'), 10);
        console.log(this.idReceta);
        this.receta = this.recetaService.getReceta(this.idReceta);
      }
    );
  }

}
