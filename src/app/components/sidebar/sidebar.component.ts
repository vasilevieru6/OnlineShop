import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ ProductService ]
})
export class SidebarComponent implements OnInit {

  selectedCategories: any[] = [];
  currentUrl: string;
  categories: any[] = [];

  constructor(public service: ProductService, private router: Router) {
    router.events.subscribe((_:NavigationEnd) => this.currentUrl = _.url);
  }

  ngOnInit() {
    this.service.getCategories().subscribe(x => this.categories = x);

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
