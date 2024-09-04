import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServeiAuthService } from '../sevices/servei.auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: ServeiAuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Comprova si l'usuari està logat
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      //Redirigeix a la pàgina de login i guarda la URL que intentava accedir
      return this.router.createUrlTree(['/Login'], { queryParams: { redirectUrl: state.url } });
    }
  }

}
