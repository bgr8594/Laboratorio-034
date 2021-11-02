import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  user: User = new User();
  ionicForm: FormGroup;
  constructor(private autSvc: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private formBilder: FormBuilder,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.buildForm();
  }

  async onLogin(){
    const user = await this.autSvc.onLogin(this.user);
    if(user!=null && user.code ==undefined){
      console.log('Successfully logged in!');
      setTimeout(() => {
        this.loadingController.dismiss();
        this.router.navigate(['/home']);
      }, 650);
    }
    else{
      if(user.code){
        this.loadingController.dismiss();
        if(user.code=='auth/wrong-password' || user.code =='auth/invalid-email' || user.code=='auth/argument-error' ||
        user.code =='auth/user-not-found'){
          this.openModal(user);
        }
      }
    }
  }

  async openModal(user: any){
    const modal = await this.modalCtrl.create({
      component: ModalErrorComponent,
      componentProps:{
        error: 'Ingres password y/o contraseña'
      }
    });
    return await modal.present();
  }

  submitForm(){
    if(this.ionicForm.valid){
      this.user.email= this.ionicForm.get('email').value;
      this.user.password = this.ionicForm.get('password').value;
      this.presentLoadingWithOptions();
      this.onLogin();
    }
  }

  buildForm(){
    this.ionicForm = this.formBilder.group(
      {
        email: new FormControl('',{validators: [Validators.email, Validators.required]}),
      password: new FormControl('', {validators:[Validators.required, Validators.maxLength(6), Validators.minLength(6)]})
      }
    );
  }

  notZero(control: AbstractControl) {

		if (control.value && control.value.monto <= 0) {

			return { 'notZero': true };

		}

		return null;

	}

  

  hasError: any = (controlName: string, errorName: string) => {

		return !this.ionicForm.controls[controlName].valid &&

			this.ionicForm.controls[controlName].hasError(errorName) &&

			this.ionicForm.controls[controlName].touched;

	}

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }  
}
