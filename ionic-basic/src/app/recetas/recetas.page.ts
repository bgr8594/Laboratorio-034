import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../recetas.service';
import { Receta } from './receta.model';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  recetas: Receta[];
  constructor(private recetaService: RecetasService) { }

  ngOnInit() {
    this.recetas = this.recetaService.getRecetas();
  }

}
