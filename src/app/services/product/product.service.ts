import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {ProductCategories} from '../../models/product/ProductCategories';
import 'rxjs/add/operator/do';
import {Product} from '../../models/product/Product';
import {debounceTime, map} from 'rxjs/operators';
import {Category} from '../../models/product/Category';
import {SubCategory} from '../../models/product/SubCategory';
import {Page} from '../../models/product/Page';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;
  baseUrl: string = '/api/product/categoriesAndSubCategories';
  prodUrl: string = '/api/product/items';
  url: string = '/api/product';
  category: string;
  subCategory: string;
  categories = new ReplaySubject<ProductCategories[]>(1);
  selected: string;

  constructor(private http: HttpClient) {
    this.getCategoriesAndSubCategories().subscribe(result => {
      this.categories.next(result);
    })
  }

  public totalProduct: number;
  products: Product[] = [];

  getMostShippedProducts(pageNumber: number, pageSize: number){
    return this.http.get<Page<Product>>("/api/product/mostShipped/" + pageNumber + '/' + pageSize);
  }

  getCategoriesAndSubCategories() {
    return this.http.get<ProductCategories[]>(this.baseUrl);
  }

  searchCategory(categ: string){
    const listCateg = this.http.get<Category[]>("/api/product/categories/" + categ)
      .pipe(
        debounceTime(500),
        map((data) => {
          return(data.length != 0 ? data : null);
        })
      );
    return listCateg;
  }

  searchSubCategories(subCateg: string){
    const listSubCateg = this.http.get<SubCategory[]>("/api/product/subCategories/" + subCateg)
      .pipe(
        debounceTime(500),
        map((data) => {
          return(data.length != 0 ? data : null);
        })
      );
    return listSubCateg;
  }

  getAllProducts(){
    return this.http.get<Product[]>("/api/product/items");
  }

  getProductsInfo() {
    return this.http.get<ProductCategories[]>(this.prodUrl);

  }

  getProductsOfCategory(category: string, subCategory: string, pageNumber: number, pageSize: number) {
    this.selected = this.subCategory;
    return this.http.get<Page<Product>>('/api/product/' + category + '/' + subCategory + '/' + pageNumber + '/' + pageSize);
  }

  getProductById(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  createProduct(product: Product) {
    product.id = 0;
    return this.http.post('/api/product', product);
  }

  deleteProduct(id: number) {
    return this.http.delete('/api/product/' + id);
  }

  getProductsOfPage(pageNumber: number, pageSize: number){
    return this.http.get<Page<Product>>("/api/product/items/" + pageNumber + "/" + pageSize);
  }

  updateProduct(product: Product) {
    return this.http.patch('/api/product/' + product.id, product);
  }
}
