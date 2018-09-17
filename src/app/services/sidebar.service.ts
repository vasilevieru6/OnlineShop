import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
import {Observable} from 'rxjs';
import {ProductCategories} from '../models/ProductCategories';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  baseUrl: string = 'api/product/categories';
  prod: Object;


  constructor(private http: HttpClient) {
  }
}
