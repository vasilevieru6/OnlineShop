import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product/Product';
import {CartItemQuantity} from '../../models/cart/CartItemQuantity';
import {CartService} from '../../services/cart/cart.service';
import {ProductService} from '../../services/product/product.service';
import {CurrentUserService} from '../../services/user/current-user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  pageSize = 10;
  currentPage = 0;
  totalSize: number = 0;
  products: Product[] = [];

  constructor(private cartService: CartService, private productService: ProductService, public currentUserService: CurrentUserService) {
    this.productService.getMostShippedProducts(this.currentPage + 1, this.pageSize).subscribe(result => {
      this.products = result.data;
      this.totalSize = result.count;
    });
  }

  ngOnInit() {

  }

  addToCart(prod: CartItemQuantity) {
    let product = new CartItemQuantity();
    product.quantity = prod.quantity;
    product.productId = prod.id;
    this.cartService.addProductToCart(product);
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.productService.getMostShippedProducts(this.currentPage + 1, this.pageSize).subscribe(result => {
      this.products = result.data;
      this.totalSize = result.count;
    });
  }

}
