import { Component, OnInit } from '@angular/core';
import { Receta } from './receta.model';
import { RecetaService } from './receta.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  recetas: Receta[];
  constructor(private recetaService: RecetaService) { }

  ngOnInit() {
    this.recetas = this.recetaService.getRectas();
  }

}