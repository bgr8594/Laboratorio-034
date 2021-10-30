export class Lugar {
  id?: string;
  nombre: string;
  ubicacion?: {latitud: string;longitud: string};
  latitud: number;
  longitud: number;

   constructor(){
       this.nombre='';
   }
   // eslint-disable-next-line @typescript-eslint/naming-convention
   public setUbicacion(latitud: string, Longitud: string){
       this.ubicacion.latitud= latitud;
       this.ubicacion.longitud = Longitud;
}
}
