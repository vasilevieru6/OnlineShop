import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product/Product';
import {CartService} from '../../services/cart/cart.service';
import {CartItemQuantity} from '../../models/cart/CartItemQuantity';
import {CurrentUserService} from '../../services/user/current-user.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [ProductService]
})
export class ItemsComponent implements OnInit {

  pageSize = 10;
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

