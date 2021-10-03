import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentesModule } from './componentes/componentes.module';
import {AngularFireStoreModule} from 'angularfire2/firestore';
<<<<<<< HEAD
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
=======
>>>>>>> ionic-basic-1848881

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [ComponentesModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),AngularFireAuthModule ],
=======
  imports: [ComponentesModule,ComponentesModule,BrowserModule, IonicModule.forRoot(),
     AppRoutingModule, HttpClientModule],
>>>>>>> ionic-basic-1848881
  providers: [HttpClientModule, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
