import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  create(address: Address){
    return this.http.post('/api/address', address);
  }

  getAddresses(){
    return this.http.get<Address[]>("/api/address");
  }
}
