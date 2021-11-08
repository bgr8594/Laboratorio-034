import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentesModule } from './componentes/componentes.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [ComponentesModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),AngularFirestoreModule,AngularFireAuthModule ],

 
  providers: [HttpClientModule, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
