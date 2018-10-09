import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/skipWhile'
import 'rxjs/add/operator/timeoutWith'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {CurrentUserService} from '../services/user/current-user.service';
import {CartService} from '../services/cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private currentUserService: CurrentUserService, private router: Router, private cartService: CartService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.currentUserService.isAuthorized()
      .map((isAuthorized: boolean) => {
        console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);
        if (isAuthorized && this.cartService.cartItems) {
          return true
        }

        this.router.navigate(['unauthorized']);
        return false;
      });
  }
}
