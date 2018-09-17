import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {ProductCategories} from '../models/ProductCategories';
import 'rxjs/add/operator/do';
import {Product} from '../models/Product';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;
  baseUrl: string = '/api/product/categories';
  prodUrl: string = '/api/product/items';
  url: string = '/api/product';
  category: string;
  subCategory: string;


  constructor(private http: HttpClient) {
    // this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }

  public totalProduct: number;
  products: Product[] = [];



  getCategories() {
    return this.http.get<ProductCategories[]>(this.baseUrl).do(console.log);
  }

  getAllProducts(){
    return this.http.get<Product[]>("/api/product/items").do(console.log);
  }

  getProductsInfo() {
    return this.http.get<ProductCategories[]>(this.prodUrl).do(console.log);

  }


  getProductsOfCategory(category: string, subCategory: string) {
    return this.http.get<Product[]>(this.url + '/' + category + '/' + subCategory).do(console.log);//.subscribe(data => this.products = data);
  }



  getProductById(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  createProduct(product: Product) {
    console.log("Post Method");
    return this.http.post('/api/product/create', product).subscribe();
  }

  // updateProduct(product: ProductCategories) {
  //   return this.http.put(this.baseUrl + '/' + product.id, product);
  // }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  // getCategories(){
  //   return this.getCategories().do(console.log);
  //   // console.log(JSON.stringify());
  //   //console.log(this.output);
  //  // return this.output;
  // }
}
