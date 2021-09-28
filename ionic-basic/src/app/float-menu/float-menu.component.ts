import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuElement } from './menu.model';

@Component({
  selector: 'app-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['float.component.scss'],
})
export class FloatMenuComponent implements OnInit {

  datosMenu: MenuElement[] =[
    {nombre: 'Alumnos',enlace:'/alumnos',
  icono:'school-outline'},
    {nombre: 'Receteas',enlace:'/recetas',
    icono:'restaurant-outline'},
    {nombre: 'Tabs',enlace:'/tabs',
    icono:'folder-outline'},
    {nombre: 'Login',enlace:'/login',
    icono:'home'},
    {nombre: 'Destino',enlace:'/destinos',
    icono:'train-outline'},
    {nombre: 'Logout',enlace:'/home',
    icono:'log-out-outline'} 
  ];
  constructor(private router: Router) { }

  ngOnInit() {}

  navegar(link: string){
    this.router.navigate([link]);
  }
}
