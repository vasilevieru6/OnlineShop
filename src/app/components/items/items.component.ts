import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {SidebarService} from '../../services/sidebar.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ProductService]
})
export class ItemsComponent implements OnInit {

  products: Product[] = [];
  category: string;
  subCategory: string;
  public totalCount: number;

  constructor(public service: ProductService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.category = params.category;
      this.subCategory = params.subCategory;
      this.service.getProductsOfCategory(this.category, this.subCategory).subscribe(data => this.products = data);
    });

  }

  ngOnInit() {

  }
}

