import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Lugar } from '../shared/lugar';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private basePath='http://localhost:8090/post';


  constructor(private dbiFirestore: AngularFirestore,
    private http: HttpClient) { }
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
    getLugaresApi(): Observable<Lugar[]>{
      return this.http.get<any>(`${this.basePath}/list`,{});
      }

      altaLugarApi(lugar: Lugar){
      return this.http.post(`${this.basePath}/add`, lugar);
      }

      borrarLugarApi(id: string){
      return this.http.delete(`${this.basePath}/${id}/delete`, {});
      }

      editarLugarApi(id: string, lugar: Lugar){
      return this.http.put(`${this.basePath}/${id}/update`,lugar,{});
      }
}
