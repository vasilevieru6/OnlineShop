import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './components/catalog/catalog.component';
import { ItemsComponent } from './components/items/items.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ListProductComponent} from './components/admin/list-product/list-product.component';
import {AddProductComponent} from './components/admin/add-product/add-product.component';
import {CartComponent} from './components/cart/cart.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ConfirmationOrderComponent} from './components/confirmation-order/confirmation-order.component';
import {OrdersComponent} from './components/orders/orders.component';


export const routerConfig: Routes = [
  {
    path: '',
    component: CatalogComponent
  },
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
  },{
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },{
    path: 'unauthorized',
    component: UnauthorizedComponent
   },
  {
    path: 'notfound',
    component: NotFoundComponent
  },
  {
    path: 'cart/confirmation_order',
    component: ConfirmationOrderComponent
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
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
