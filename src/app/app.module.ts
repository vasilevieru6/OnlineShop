import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import {MAT_LABEL_GLOBAL_OPTIONS, MatIconModule} from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ItemsComponent } from './components/items/items.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListProductComponent } from './components/admin/list-product/list-product.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppMaterialModule } from './components/app-material/app-material.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OktaAuthModule} from '@okta/okta-angular';
// ...
// import { AuthInterceptor } from './auth.interceptor';


const config = {
  issuer: 'https://localhost:4200/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oag72igauWNZBme90h7',
  scope: 'openid profile email'
};

@NgModule({
  declarations: [
    AppComponent,
    /* HomeComponent,*/
    CatalogComponent,
    SidebarComponent,
    MenuComponent,
    ItemsComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    UserProfileComponent,
    AddProductComponent,
    ListProductComponent
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
    OktaAuthModule.initAuth(config)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  entryComponents: [AddProductComponent]
})
export class AppModule {


}
