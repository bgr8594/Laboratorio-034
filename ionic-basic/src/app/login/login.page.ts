import { Component, OnInit } from '@angular/core';//
import { User } from 'src/shared/user.class';//
import { AuthService } from '../services/auth.service';//
import { Router } from '@angular/router';//
import { ModalController } from '@ionic/angular';//
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
//import {ModalErrorComponent} from '../modal-error/modal-error.component;'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  //styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User= new User();
  ionicForm: any;
  formBuilder: any;
  constructor(private autSvc:AuthService,
    private router: Router,
    private modalCtrl: ModalController){ }

  ngOnInit() { 
  }

  async onLogin(){
    const user = await this.autSvc.onLogin(this.user);
    if(user!=null && user.code==undefined){
      console.log('Successfully logged in');
      this.router.navigate(['/home']);
    }
    else{
      if(user.code){
        if(user.code=='auth/wrong-password'||user.code=='auth/invalid-email'||user.code=='auth/user-not-found'){
          this.openModal(user);
        }
      }
    }
  }
  async openModal(user: any) {
    const modal = await this.modalCtrl.create({
      component: ModalErrorComponent,
      componentProps:{
        error: 'Ingrese password y/o constraseña'
      }
    });
    return await modal.present();
  }
  submitForm(){
    if(this.ionicForm.valid){
      this.user.email=this.ionicForm.get('email').value;
      this.user.password=this.ionicForm.get('password').value;
      this.onLogin();
    }

  }

  buildForm(){
    this.ionicForm = this.formBuilder.group(
      {email: new FormControl('',{validators:[Validators.email, Validators.required]}),
      password: new FormControl('',{validators:[Validators.required, Validators.maxLength(6), Validators.minLength(6)]})
    }
      );
  }

  notZero(control: AbstractControl){
    if(control.value && control.value.monto <= 0){
      return{'notZero': true}
    }
    return null;
  }

  hasError: any = (controlName: string, errorName: string) => {
    return !this.ionicForm.controls[controlName].valid &&
    this.ionicForm.controls[controlName].hasError(errorName) &&
    this.ionicForm.controls[controlName].touched;
  }
}
