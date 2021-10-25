import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {


  apiKey: string =environment.apiKeyGoogleMaps;
  mapsLoad: boolean = false;
  constructor() { }

  init(renderer: any, document: any){
    return new Promise((resolve, reject) => {
      if(this.mapsLoad){
        console.log('google is preview loaded');
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id="googleMaps";
      window['mapInt'] = () =>{
        this.mapsLoad=true;
        if(google){
          console.log('google is loaded')
        } else {
          console.log('google is not defined')
        }
        resolve(true);
        return;
      };
      if(this.apiKey){
        script.src='https://maps.googleapis.com/maps/api/js?key='+this.apiKey+'$callback=mapInit';
      } else{
        script.src= 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }
      renderer.appendChild(document.body, script);
    });
  }
}
