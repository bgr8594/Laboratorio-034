import { Injectable } from '@angular/core';
import { Alumno } from './alumno.model';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos: Alumno[]=[{
    id: '1',
    nombre: 'Luis Cortez',
    edad: '25',
    matricula: '1546624',
    correo: 'luis_gonzalez.95@hotmail.com'
  },{
    id: '2',
    nombre: 'Americo Guajardo',
    edad: '25',
    matricula: '1543543',
    correo: 'ame.gua@hotmail.com'
  },{
    id: '3',
    nombre: 'Gustavo Rdz',
    edad: '25',
    matricula: '1354715',
    correo: 'gust.rdz@hotmail.com'
  },{
    id: '4',
    nombre: 'Alfredo Aranda',
    edad: '25',
    matricula: '3543541',
    correo: 'alfr.arand@hotmail.com'
  }];
  constructor(private http: HttpClient) { }

  getAlumnos(){
    return [...this.alumnos];
  }

  getAlumno(idAlumno: string){
    return {...this.alumnos.find((alumno: Alumno)=>{
      return alumno.id === idAlumno
    })}
  }

  borrarAlumno(idAlumno: string){
    this.alumnos = 
    this.alumnos.filter((alumno: Alumno)=>{
      return alumno.id!=idAlumno
    });
  }

  agregarAlumno(nombre: string,
    edad: string,
    matricula: string,
    correo: string){

      this.alumnos.push({
        nombre,
        edad,
        matricula,
        correo,
        id: this.alumnos.length+1 +''
      })
  }

  getPersonajes() : Observable<any>{
    return this.http.get<any>('http://swapi.dev/api/people',{});
  }

  getPersonaje(idPersonaje:string): Observable<any>{
    return this.http.get<any>('http://swapi.dev/api/people/${idPersonaje}',{});
  }


}
