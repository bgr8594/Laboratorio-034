import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MenuElement } from './menu.model';

@Component({
  selector: 'app-menu-flotante',
  templateUrl: './menu-flotante.component.html',
  styleUrls: ['menu-flotante.scss'],
})
export class MenuFlotanteComponent implements OnInit {

  datosMenu: MenuElement[] =[];

  constructor(private router: Router, private autSvc: AuthService) { }

  ngOnInit() {
    if(this.autSvc.isLoged){
      this.datosMenu = [
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
    } else{
      this.datosMenu =
      [
          {nombre: 'register',enlace:'/register',
          icono:'person-add'},
          {nombre: 'login',enlace:'/login',
          icono:'log-in'}
        ];
    }
  }

  navegar(link: string){
    this.router.navigate([link]);
  }

  onMenuOpen(){
    if(this.autSvc.isLoged){
      this.datosMenu =
      [
        {nombre: 'Alumnos',enlace:'/alumnos',
        icono:'school-outline'},
          {nombre: 'Receteas',enlace:'/recetas',
          icono:'restaurant-outline'},
          {nombre: 'Tabs',enlace:'/tabs',
          icono:'folder-outline'},
          {nombre: 'register',enlace:'/register',
          icono:'person-add'},
          {nombre: 'login',enlace:'/login',
          icono:'log-in'},
          {nombre: 'Turismo',enlace:'/destinos',
          icono:'airplane'},
          {nombre: 'logout',enlace:'/home',
          icono:'log-out'}
        ];
    } else{
      this.datosMenu =
      [
          {nombre: 'register',enlace:'/register',
          icono:'person-add'},
          {nombre: 'login',enlace:'/login',
          icono:'log-in'}
        ];
    }
  }

}
