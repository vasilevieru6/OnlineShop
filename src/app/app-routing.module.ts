import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './components/catalog/catalog.component';
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ListProductComponent} from './components/admin/list-product/list-product.component';
import {AddProductComponent} from './components/admin/add-product/add-product.component';


export const routerConfig: Routes = [
  {
    path: '',
    component: CatalogComponent
  },
  // {
  //   path: 'catalog',
  //   component: CatalogComponent
  // },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product/:category/:subCategory',
    component: ItemsComponent
  },{
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'list',
    component: ListProductComponent
  },{
    path: 'create',
    component: AddProductComponent
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routerConfig, {scrollPositionRestoration: 'enabled'}),
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
