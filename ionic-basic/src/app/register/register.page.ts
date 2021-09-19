import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user.class';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();
  constructor(private autSvc: AuthService, private router: Router) {

   }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.autSvc.onRegister(this.user);
    if(user){
      console.log('Successfully created user!');
      this.router.navigate(['/']);
    }
  }

}
