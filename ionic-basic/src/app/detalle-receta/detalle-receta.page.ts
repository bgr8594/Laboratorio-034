import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../recetas/receta.models';
import { RecetaService } from '../recetas/receta.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
  private recetaService: RecetaService,
  private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    const usuario ={nombre:'Benito', activo:true,fechanaci:0};
    this.firestore.collection('usuario').add(usuario);

    this.ActivatedRoute.paramMap.subscribe(
      paramMap =>{
        this.idReceta= Number.parseInt(paramMap.get('idReceta'));
        console.log(this.idReceta);
        this.receta=this.recetaService.getRecetas(this.idReceta);
        console.log(this.receta);
      }
    );
  }

}
