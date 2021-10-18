import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lugar } from '../shared/lugar';
import { LugaresService } from '../service/lugares.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html'
})
export class DestinosPage implements OnInit, OnDestroy {

  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  ionicForm: FormGroup;
  estado: string ="Alta destino";
  editando: boolean = false;
  latitud : number;
  longitud: number;
  subscripcion: Subscription;

  constructor(private lugaresServices: LugaresService, private formBuilder: FormBuilder) { }

  ngOnDestroy(): void{
    if(this.subscripcion){
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit() {
    this.getPosition();
    this.buildForm();
    // consulta de lugares por medio de snapshoChanges que consulta en tiempo real
    /*
    this.lugaresServices.getLugaresChanges().subscribe(
      response=>{
        this.destinos = response.map((e:any)=>{
          return {
            id: e.payload.doc.id,
            nombre: e.payload.doc.data().nombre
          }
        });
       }, 
      error=>{ console.error(error)}
      );
      */
     // Llamada a consultar lugares por medio del api
     this.subscripcion = this.getLugares();
  }


  getLugares(): Subscription{
    return this.lugaresServices.getLugaresApi().subscribe((response: Lugar[])=>{
      this.destinos = response
    }, error=>{
      console.error();
    });
  }


  editarLugar(id: any, lugar: any) {
    this.editando = true;
    this.lugar = lugar;
    this.estado = "Editar el lugar";
    this.ionicForm.get('nombre').setValue(lugar.nombre);
  }

  eliminarLugar(id: any) {
   /* this.estado = "Alta destino";
    this.editando = false;
    this.ionicForm.reset();
    this.lugaresServices.deleteLugar(id);*/
    this.lugaresServices.borrarLugarApi(id).subscribe((response: any)=>{
      if(response){
        this.estado = "Alta destino";
        this.editando = false;
        this.ionicForm.reset();
        this.subscripcion = this.getLugares();
      }
      }, error=>{
      console.error(error);
      });
  }


  altaLugar(){
    this.lugaresServices.altaLugar(this.lugar);
  }

  submitForm(){
    if(this.ionicForm.valid){
      this.lugar.nombre = this.ionicForm.get('nombre').value;
      this.lugar.latitud = this.latitud;
      this.lugar.longitud = this.longitud; 
      if(!this.editando){
/* alta lugar a traves de firestore
        this.lugaresService.altaLugar(this.lugar).then((e:any)=>{
          this.ionicForm.reset();
        }).catch(e=>{
          console.error(e);
        });        
*/

// alta de lugar desde api
        this.lugaresServices.altaLugarApi(this.lugar).subscribe((reponse: any)=>{
          this.subscripcion = this.getLugares();
          this.ionicForm.reset();
        }, error=>{
          console.log(error);
        });

      } else{
/* editar lugar a traves de firestore
        this.lugaresService.updateLugares(this.lugar.id, this.lugar).then(e=>{
          this.editando= false;
          this.estado = "Alta destino";
          this.lugar = new Lugar();
          this.ionicForm.reset();
        }).catch(e=>{
          console.error(e);
        });
*/

//editar el lugar a traves de api-->firestore
        this.lugaresServices.editarLugarApi(this.lugar.id, this.lugar).subscribe((response: any)=>{
          this.editando= false;
          this.estado = "Alta destino";
          this.lugar = new Lugar();
          this.subscripcion = this.getLugares();
          this.ionicForm.reset();
        }, error=>{
          console.error(error);
        });
      }
    }
  }

  cancelarEdicion(){
    this.estado = "Alta destino";
    this.editando = false;
    this.ionicForm.reset();
    this.lugar = new Lugar();
  }

  buildForm(){
    this.ionicForm = this.formBuilder.group(
      {
        nombre: new FormControl('',{validators: [Validators.required]})
      }
    );
  }

  hasError: any = (controlName: string, errorName: string) => {
		return !this.ionicForm.controls[controlName].valid &&
			this.ionicForm.controls[controlName].hasError(errorName) &&
			this.ionicForm.controls[controlName].touched;
	}  

  getPosition(): Promise<any> {
		return new Promise((resolve: any, reject: any): any => {
			navigator.geolocation.getCurrentPosition((resp: any) => {
				this.latitud = resp.coords.latitude;
				this.longitud = resp.coords.longitude;
			},
			(err: any) => {
				if ( err.code === 1 ) {
					alert('Favor de activar la geolocalización en tu navegador y recargar la pantalla.');
				}
				this.latitud = null;
				this.longitud = null;
			}, {timeout: 5000, enableHighAccuracy: true });
		});

	} 

}

