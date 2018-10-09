import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {CatalogComponent} from './components/catalog/catalog.component';
import {RouterModule} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {ItemsComponent} from './components/items/items.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ListProductComponent} from './components/admin/list-product/list-product.component';
import {AddProductComponent} from './components/admin/add-product/add-product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from './services/product/product.service';
import {HttpClientModule} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.Interceptor';
import {FormsModule} from '@angular/forms';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  AuthWellKnownEndpoints,
  OidcConfigService
} from 'angular-auth-oidc-client';


import {AppMaterialModule} from './components/app-material/app-material.module';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {CartComponent} from './components/cart/cart.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth.guard';
import {ConfigurationService} from './configuration/configuration.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmationOrderComponent } from './components/confirmation-order/confirmation-order.component';
import { AddressComponent } from './components/address/address.component';
import {OrderService} from './services/order/order.service';
import {ConfirmationOrderGuard} from './guards/confirmation-order.guard';
import { OrdersComponent } from './components/orders/orders.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP-INITIALIZER STARTING');
  return () => oidcConfigService.load('http://localhost:4200/api/config.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    SidebarComponent,
    ItemsComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    UserProfileComponent,
    AddProductComponent,
    ListProductComponent,
    CartComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    ConfirmationOrderComponent,
    AddressComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    AuthModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    ProductService,
    OidcConfigService,
    AuthGuard,
    ConfirmationOrderGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [OidcConfigService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ConfigurationService,
    OrderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddProductComponent, AddressComponent]
})
export class AppModule {

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService
  ) {
      this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
        const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
        openIDImplicitFlowConfiguration.stsServer = this.oidcConfigService.clientConfiguration.stsServer;
        openIDImplicitFlowConfiguration.redirect_url = this.oidcConfigService.clientConfiguration.redirect_url;

        openIDImplicitFlowConfiguration.client_id = this.oidcConfigService.clientConfiguration.client_id;
        openIDImplicitFlowConfiguration.response_type = this.oidcConfigService.clientConfiguration.response_type;
        openIDImplicitFlowConfiguration.scope = this.oidcConfigService.clientConfiguration.scope;
        openIDImplicitFlowConfiguration.post_logout_redirect_uri = this.oidcConfigService.clientConfiguration.post_logout_redirect_uri;
        openIDImplicitFlowConfiguration.start_checksession = this.oidcConfigService.clientConfiguration.start_checksession;
        openIDImplicitFlowConfiguration.silent_renew = this.oidcConfigService.clientConfiguration.silent_renew;
        openIDImplicitFlowConfiguration.silent_renew_url = this.oidcConfigService.clientConfiguration.silent_renew_url;
        openIDImplicitFlowConfiguration.post_login_route = this.oidcConfigService.clientConfiguration.startup_route;
        // HTTP 403
        openIDImplicitFlowConfiguration.forbidden_route = this.oidcConfigService.clientConfiguration.forbidden_route;
        // HTTP 401
        openIDImplicitFlowConfiguration.unauthorized_route = this.oidcConfigService.clientConfiguration.unauthorized_route;
        openIDImplicitFlowConfiguration.log_console_warning_active = this.oidcConfigService.clientConfiguration.log_console_warning_active;
        openIDImplicitFlowConfiguration.log_console_debug_active = this.oidcConfigService.clientConfiguration.log_console_debug_active;

        openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = this.oidcConfigService.clientConfiguration.max_id_token_iat_offset_allowed_in_seconds;

        const authWellKnownEndpoints = new AuthWellKnownEndpoints();
        authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

        this.oidcSecurityService.setupModule(
          openIDImplicitFlowConfiguration,
          authWellKnownEndpoints
        );
      });
  }
}
