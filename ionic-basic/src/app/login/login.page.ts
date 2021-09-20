import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/user.class';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {ModalControllerComponent } from '../modal-error/modal-error.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User= new User();

  constructor(private autSvc:AuthService,
    private router: Router,
    private modalCtrl: ModalController){ }

  ngOnInit() {
    const user = await this.autSvc.onLogin(this.user);
    if(user!=null&&user.code==undefined){
      console.log('Succesfully logged in!');
      this.router.navigate(['/home']);
    }
    else
  }

}
