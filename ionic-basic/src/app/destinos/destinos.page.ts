import { Component, OnDestroy, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { Lugar } from '../shared/lugar';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html'
})
export class DestinosPage implements OnInit, OnDestroy{

  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  ionicForm: FormGroup;
  estado ='Alta destino';
  editando = false;
  subscripcion: Subscription;
  latitud: number;
  longitud: number;

  constructor(private lugaresService: LugaresService,
  private formBuilder: FormBuilder,
  private modalController: ModalController) { }
  ngOnDestroy(): void {
    if(this.subscripcion){
      this.subscripcion.unsubscribe();
  }
}

  ngOnInit() {
    this.buildForm();
    this.getPosition();
    //Consulta de lugares por medio de snapshotChanges que consulta en tiempo real

    /*this.lugaresService.getLugaresChanges().subscribe(
      response=>{
        this.destinos = response.map((e: any)=>({
            id: e.payload.doc.id,
            nombre: e.payload.doc.data().nombre
          }));
       },
      error=>{ console.error(error);}
      );*/
      this.subscripcion = this.getLugares();
  }


      getLugares(): Subscription{
        return this.lugaresService.getLugaresApi().subscribe((response: Lugar[])=>{
          this.destinos = response;
        }, error=>{
          console.error();
        });
      }

  editarLugar(id: any, lugar: any) {
    this.editando = true;
    this.lugar = lugar;
    this.estado = 'Editar el lugar';
    this.ionicForm.get('nombre').setValue(lugar.nombre);
  }

  eliminarLugar(id: any) {

    this.lugaresService.borrarLugarApi(id).subscribe((response: any)=>{
      if(response){
        this.estado = 'Alta destino';
        this.editando = false;
        this.ionicForm.reset();
        this.subscripcion = this.getLugares();
      }
      }, error=>{
      console.error(error);
      });

  }


  altaLugar(){
    this.lugaresService.altaLugar(this.lugar);
  }

  submitForm(){
    if(this.ionicForm.valid){
      this.lugar.nombre = this.ionicForm.get('nombre').value;
      this.lugar.latitud = this.latitud;
      this.lugar.longitud = this.longitud;
      if(!this.editando){
        this.lugaresService.altaLugarApi(this.lugar).subscribe((reponse: any)=>{
          this.subscripcion = this.getLugares();
          this.ionicForm.reset();
        }, error=>{
          console.log(error);
        });
      } else{
        this.lugaresService.editarLugarApi(this.lugar.id, this.lugar).subscribe((response: any)=>{
          this.editando= false;
          this.estado = 'Alta destino';
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
    this.estado = 'Alta destino';
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

  hasError: any = (controlName: string, errorName: string) => !this.ionicForm.controls[controlName].valid &&
    this.ionicForm.controls[controlName].hasError(errorName) &&
    this.ionicForm.controls[controlName].touched;

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

    async addDirection(){
      const positionInput: any = {
        lat: -2.898116,
        lng: -78.99958149999999
      };
      if(this.latitud !== null){
        positionInput.lat = this.latitud;
        positionInput.lng = this.longitud;
      }


      const modalAdd = await this.modalController.create({
        component: GooglemapsComponent,
        mode: 'ios',
        swipeToClose: true,
        componentProps: {position: positionInput}
      });

      await modalAdd.present();

      const {data} = await modalAdd.onWillDismiss();

      if(data){
        console.log('data->', data);
        //this.cli
        this.longitud = data.pos.lng;
        this.latitud = data.pos.lat;
        console.log('datos de ubiciacion actualizados, latitud: '+this.latitud+' \nlongitud:'+this.longitud);
      }
    }

 /* hasError: any = (controlName: string, errorName: string) =>
    !this.ionicForm.controls[controlName].valid &&
    this.ionicForm.controls[controlName].hasError(errorName) &&
    this.ionicForm.controls[controlName].touched;*/



}