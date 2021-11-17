import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Lugar } from '../shared/lugar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private basePath: string ="http://localhost:8080/post";
  
  constructor(private dbFirestore: AngularFirestore,
    private http: HttpClient) { }

  altaLugar(lugar: Lugar){
    const lugarTemp: any ={
      nombre:lugar.nombre,
      latitud: lugar.latitud,
      longitud: lugar.longitud
    };
    return this.dbFirestore.collection('lugar').add(lugarTemp);
  }

  async getLugares(destinos: Lugar[]){
    const lugares = this.dbFirestore.collection('lugar');
    const snapshot = await lugares.get().toPromise().
    then(snapshot=>{
      destinos.splice(0, destinos.length);
      snapshot.forEach(doc=>{
        let data: any = doc.data();
        let lugar: Lugar = new Lugar();
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
    return this.dbFirestore.collection('lugar').snapshotChanges();
  }

  updateLugares(id: any, lugar: any){
   return this.dbFirestore.collection('lugar').doc(id).update(lugar);
  }

  deleteLugar(id: any){
    return this.dbFirestore.collection('lugar').doc(id).delete();
  }

  getLugaresApi() :Observable<Lugar[]>{
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
