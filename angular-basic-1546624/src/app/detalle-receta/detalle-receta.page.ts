import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private recetaService: RecetaService,
    private firestore: AngularFirestore
    ) { }

  ngOnInit() {

    const usuario = {nombre:'Luis', activo:true,
    fechanaci: 0};
    this.firestore.collection('usuario').add(usuario);
    
    this.activatedRoute.paramMap.subscribe(
      paramMap =>{
        this.idReceta = Number.parseInt(paramMap.get('idReceta'));
        console.log(this.idReceta);
        this.receta = this.recetaService.getReceta(this.idReceta);
        console.log(this.receta);
      }
    );
  }

}