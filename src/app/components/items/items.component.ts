import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Product} from '../../models/Product';
import {CartService} from '../../services/cart.service';
import {CartItemQuantity} from '../../models/CartItemQuantity';
import {NotificationService} from '../../services/notification.service';
import {MatTableDataSource} from '@angular/material';
import {CartItem} from '../../models/CartItem';
import {CurrentUserService} from '../../services/current-user.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ProductService]
})
export class ItemsComponent implements OnInit {

  pageSize = 2;
  currentPage = 0;
  totalSize: number = 0;
  products: Product[] = [];
  category: string;
  subCategory: string;
  public totalCount: number;

  constructor(public service: ProductService, private route: ActivatedRoute, private router: Router, private cartService: CartService, public currentUserService: CurrentUserService) {
    this.route.params.subscribe(params => {
      this.category = params.category;
      this.subCategory = params.subCategory;
      this.service.getProductsOfCategory(this.category, this.subCategory, this.currentPage + 1, this.pageSize).subscribe(result => {
        this.products = result.data;
        this.totalSize = result.count;
      });
    });
  }

  ngOnInit() {

  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.service.getProductsOfCategory(this.category, this.subCategory, this.currentPage + 1, this.pageSize).subscribe(result => {
      this.products = result.data;
      this.totalSize = result.count;
    });
  }

  addToCart(prod: CartItemQuantity) {
    let product = new CartItemQuantity();
    product.quantity = prod.quantity;
    product.productId = prod.id;
    this.cartService.addProductToCart(product);
  }
}

