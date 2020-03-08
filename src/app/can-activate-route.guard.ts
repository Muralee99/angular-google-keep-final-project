import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private _authService: AuthenticationService,
              private routeService: RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const booleanPromise = this._authService.isUserAuthenticated(this._authService.getBearerToken());
    console.log('print booleanPromise' + booleanPromise);
    return booleanPromise.then((authenticated) => {
      console.log('isAuthenticated ' + authenticated);
      if ( ! authenticated ) {
         this.routeService.routeToLogin();
      }
    return authenticated;
    });
  }
}
