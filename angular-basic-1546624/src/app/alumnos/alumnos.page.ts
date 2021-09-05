import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alumno } from './alumno.model';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit, OnDestroy {

  private alumnos: Alumno[];
  private subscription: Subscription = new Subscription();

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
    this.alumnos = this.alumnosService.getAlumnos();
    this.subscription = 
    this.alumnosService.getPersonajes().subscribe(
      (response: any)=>{
        console.log(response);
      });
  }

  ionViewWillEnter(){
    this.alumnos = this.alumnosService.getAlumnos();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log("Adios, liberaste la memoria")
  }

}
