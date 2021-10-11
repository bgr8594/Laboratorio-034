import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/shared/lugar';
import { LugaresService } from '../services/lugares.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
})
export class DestinosPage implements OnInit {
  lugar:Lugar= new Lugar();
  destinos:any[]=[];
  ionicForm:FormGroup;
  estado:string="Alta destino";
  editando:boolean=false;
  constructor(private lugaresService: LugaresService,
     private formBuilder:FormBuilder ) { }

  ngOnInit() {
    this.buildForm();
    this.lugaresService.getLugaresChanges().subscribe(
      response=>{
        this.destinos=response.map((e:any)=>{
          return {
            id: e.payload.doc.id,
            nombre:e.payload.doc.data().nombre
          }
        });
      },
      error=>{console.error(error)}
      )
  }


  editarLugar(id: any, lugar: any){
  this.editando=true;
  this.lugar=lugar;
  this.estado="Editar el lugar";
  this.ionicForm.get('nombre').setValue(lugar.nombre);
  }

  eliminarLugar(id: any){
    this.estado="Alta destino";
    this.editando=false;
    this.ionicForm.reset();
    this.lugaresService.deleteLugar(id);
  }


  altaLugar(){
    this.lugaresService.altalugar(this.lugar);
    
  }

  submitForm(){
    if(this.ionicForm.valid){
      this.lugar.nombre = this.ionicForm.get('nombre').value;
      if(!this.editando){
        this.lugaresService.altalugar(this.lugar).then((e:any)=>{
          this.ionicForm.reset();
        }).catch(e=>{
          console.error(e);
        });        
      } else{
        this.lugaresService.updateLugares(this.lugar.id, this.lugar).then(e=>{
          this.editando= false;
          this.estado = "Alta destino";
          this.lugar = new Lugar();
          this.ionicForm.reset();
        }).catch(e=>{
          console.error(e);
        });
      }
    }
  }

  buildForm(){
    this.ionicForm = this.formBuilder.group(
      {nombre: new FormControl('',{validators:[ Validators.required]})
      
    }
      );
  }

}
