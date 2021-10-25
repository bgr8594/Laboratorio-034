import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Lugar } from '../shared/lugar';
@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(private dbiFirestore: AngularFirestore) { }
    altaLugar(lugar: Lugar){
      const lugarTemp: any ={
        nombre:lugar.nombre,
        ubicacion: {longitud:'',latitud:''}
      };
     return this.dbiFirestore.collection('lugar').add(lugarTemp);
    }

    async getLugares(destinos: Lugar[]){
      const lugares = this.dbiFirestore.collection('lugar');
      const snapcshot = await lugares.get().toPromise().
    then(snapshot=>{
      destinos.splice(0, destinos.length);
      snapshot.forEach(doc=>{
        const data: any = doc.data();
        const lugar: Lugar = new Lugar();
        lugar.nombre = data.nombre;
        console.log(doc.id);
        destinos.push(lugar);
      });
    }).
    catch(err=>{
        console.log(err);
    });
    }

    getLugaresChanges(){
      return this.dbiFirestore.collection('lugar').snapshotChanges();
    }

    updateLugares(id: any, lugar: any){
     return this.dbiFirestore.collection('lugar').doc(id).update(lugar);
    }

    deleteLugar(id: any){
      return this.dbiFirestore.collection('lugar').doc(id).delete();
    }
}
