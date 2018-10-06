import {Component, NgZone, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CurrentUserService} from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'FinalProjec';

  constructor(public currentUserService: CurrentUserService, public oidcSecurityService: OidcSecurityService, ){
    if(this.oidcSecurityService.moduleSetup){
      this.doCallbackLogicIfRequired();
    }else{
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      })
    }

  }

  doCallbackLogicIfRequired(){
    if(window.location.hash){
      this.oidcSecurityService.authorizedCallback();
    }
  }

}

