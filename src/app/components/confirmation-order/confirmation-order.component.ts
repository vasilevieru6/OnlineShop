import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../models/CartItem';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {CartService} from '../../services/cart.service';
import {Address} from '../../models/Address';
import {AddressComponent} from '../address/address.component';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';
import {AddressService} from '../../services/address.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-confirmation-order',
  templateUrl: './confirmation-order.component.html',
  styleUrls: ['./confirmation-order.component.scss']
})
export class ConfirmationOrderComponent implements OnInit {


  cartItems: CartItem[] = [];
  source: MatTableDataSource<CartItem>;
  totalPrice: number = 0;
  public displayedColumns = ['name', 'description', 'unitPrice', 'quantity'];
  quantity = 0;
  order: Order;
  address: Address;
  dialogRef: MatDialogRef<AddressComponent>;
  addresses: Address[] = [];
  selectedValue: number;


  constructor(public service: CartService, private dialog: MatDialog, private orderService: OrderService, private addressService: AddressService) { }

  ngOnInit() {
    this.service.getProductsFromCart().subscribe(result => {
      this.cartItems = result;
      this.source = new MatTableDataSource<CartItem>(this.cartItems);
    });
    this.service.totalPrice.subscribe(x => this.totalPrice = x);
    this.addressService.getAddresses().subscribe(result => {
      this.addresses = result;
    });
  }

  getDialogConfig(){
    const dialogConfig = new MatDialogConfig<Address>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '450px';
    dialogConfig.width = '450px';
    return dialogConfig;
  }

  createAddress() {
    this.address = new Address();
    let config = this.getDialogConfig();
    config.data = this.address;
    this.dialogRef = this.dialog.open(AddressComponent, config);
    this.dialogRef.afterClosed().subscribe(data => {
      this.addressService.getAddresses().subscribe(result => {
        this.addresses = result;
      });
    });
  }

  createOrder(){
    this.order = new Order();
    this.order.addressId = this.selectedValue;
    this.orderService.create(this.order).subscribe();
  }

}
