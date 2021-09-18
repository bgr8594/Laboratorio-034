import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  constructor(    private router: Router, 
    private afAuth: AngularFireAuth) {

    }

    onLogout(){
      console.log("Logout!");
      this.afAuth.auth.signOut();
      this.router.navigateByUrl('/login');
    }    

}
