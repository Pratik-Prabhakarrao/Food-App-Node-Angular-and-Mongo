// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
  
//   constructor(){}
  
//   return true;


// };



import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(private userService:UserService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.userService.currentUser.token) return true;

    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    return false;
  }
}


export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean =>{
  return inject(AuthGuard).canActivate(route, state)
}