import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {catchError, debounceTime, filter, map, take, takeWhile, timeout, timeoutWith} from 'rxjs/operators';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import 'rxjs/add/operator/skipWhile'
import 'rxjs/add/operator/timeoutWith'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {CurrentUserService} from './current-user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private currentUserService: CurrentUserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.currentUserService.isAuthorized()
      .map((isAuthorized: boolean) => {
        console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);
        if (isAuthorized) {
          return true
        }
        this.router.navigate(['unauthorized']);
        return false;
      });
  }
}
