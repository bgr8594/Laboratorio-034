import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from '../recetas.service';
import { Receta } from '../recetas/receta.model';
@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage implements OnInit {

  idReceta: number;
  receta: Receta;
  constructor(private activatedRoute: ActivatedRoute, router: Router, private recetaService: RecetasService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(    paraMap => {
      this.idReceta = Number.parseInt(paraMap.get('idReceta'));
      console.log(this.idReceta);
      this.receta = this.recetaService.getReceta(this.idReceta);
      console.log(this.receta);
    }
   );
  }

}
