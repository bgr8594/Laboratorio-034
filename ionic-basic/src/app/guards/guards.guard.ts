import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authSvc.isLoged){
        return true;
      }
      else{
        console.log('Access denied!');
        this.router.navigate(['/login']);
        return false;
      }
  }

  constructor(private authSvc: AuthService, private router: Router){
    
  }
  
}
