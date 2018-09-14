import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public totalProduct: number;


  baseUrl: string = '/api/product/categories';

  output: any;



  getProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  createProduct(product: Product) {
    return this.http.post(this.baseUrl, product);
  }

  // updateProduct(product: Product) {
  //   return this.http.put(this.baseUrl + '/' + product.id, product);
  // }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getCategories(){
    return this.getProducts().do(console.log);
    // console.log(JSON.stringify());
    //console.log(this.output);
   // return this.output;
  }
}
