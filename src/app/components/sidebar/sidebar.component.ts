import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CurrentUserService} from '../../services/current-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ ProductService ]
})
export class SidebarComponent implements OnInit {

  isAuthorizedSubscription: Subscription;
  selectedCategories: any[] = [];
  currentUrl: string;
  categories: any[] = [];

  constructor(public service: ProductService, private router: Router, public oidcSecurityService: OidcSecurityService, private currentUserService: CurrentUserService) {
    router.events.subscribe((_:NavigationEnd) => this.currentUrl = _.url);
  }

  ngOnInit() {
    this.service.getCategoriesAndSubCategories().subscribe(x => this.categories = x);
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        if (isAuthorized){
          if(this.currentUserService.isCustomer()){
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
