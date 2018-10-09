import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import {Subscription} from 'rxjs';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CurrentUserService} from '../../services/user/current-user.service';
import {SubCategory} from '../../models/product/SubCategory';
import {ProductCategories} from '../../models/product/ProductCategories';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ ProductService ]
})
export class SidebarComponent implements OnInit {

  isAuthorizedSubscription: Subscription;
  selectedCategories: any[] = [];
  currentUrl: string;
  categories: ProductCategories[] = [];

  constructor(public service: ProductService, private router: Router, public oidcSecurityService: OidcSecurityService, private currentUserService: CurrentUserService) {
    router.events.subscribe((_:NavigationEnd) => this.currentUrl = _.url);
  }

  ngOnInit() {
    //this.service.getCategoriesAndSubCategories().subscribe(x => this.categories = x);
    this.service.categories.subscribe(x => {
      this.categories = x;
    });
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        if (isAuthorized){
          if(!this.currentUserService.isCustomer()){
          }
        }
      }
    )
  }

  isOpen(key: {category: string; subcategories: string[]}){
    const index = this.selectedCategories.findIndex(y => y == key);
    return index != -1;
  }

  selectCategory(key: {category: string; subcategories: string[]}) {
    const index = this.selectedCategories.findIndex(y => y == key);
    if(index != -1)
      this.selectedCategories.splice(index, 1);
    else{
      this.selectedCategories.push(key);
    }
  }
}
