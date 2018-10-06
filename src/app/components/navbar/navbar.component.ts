import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CartItemQuantity} from '../../models/CartItemQuantity';
import {CartService} from '../../services/cart.service';
import {CurrentUserService} from '../../services/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarOpen = false;
  isAuthorizedSubscription: Subscription;
  isAuthorized: Boolean = false;
  currentUrl: string;

  constructor(public oidcSecurityService: OidcSecurityService, private router: Router, public service: CartService, public currentUserService: CurrentUserService) {
    router.events.subscribe((_:NavigationEnd) => this.currentUrl = _.url);

  }

  ngOnInit() {
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      }
    )
  }

  toggleNavbar() {
    this.isNavbarOpen= !this.isNavbarOpen;
  }

  login(){
    this.oidcSecurityService.authorize();
  }

  logout(){
    this.oidcSecurityService.logoff();
  }

}
