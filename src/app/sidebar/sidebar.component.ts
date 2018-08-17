import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ SidebarService ]
})
export class SidebarComponent implements OnInit {
  selectedCategories: any[] = [];

  constructor(private service: SidebarService) { }

  ngOnInit() {
  }

  isOpen(key: {category: string; subcategories: {name: string}[]}){
    const index = this.selectedCategories.findIndex(y => y == key);
    return index != -1;
  }

  selectCategory(key: {category: string; subcategories: {name: string}[]}) {
    const index = this.selectedCategories.findIndex(y => y == key);
    if(index != -1)
      this.selectedCategories.splice(index, 1);
    else
      this.selectedCategories.push(key);
  }
}
