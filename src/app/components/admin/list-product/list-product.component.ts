import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../models/Product';
import {ProductService} from '../../../services/product.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  dialogRef: MatDialogRef<AddProductComponent>;
  dataSource = new MatTableDataSource(this.dataSource);
  public displayedColumns = ['name', 'unitPrice', 'description', 'category', 'subCategory', 'photoUrl', 'actionsColumn'];
  editing = false;
  index: number;


  constructor(private service: ProductService, private dialog: MatDialog) {
  }

  getDialogConfig(){
    const dialogConfig = new MatDialogConfig<Product>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '550px';
    dialogConfig.width = '450px';
    return dialogConfig;
  }

  openDialog() {

    let config = this.getDialogConfig();
    config.data = this.product;

    this.dialogRef = this.dialog.open(AddProductComponent, config);

    this.dialogRef.afterClosed().subscribe(data => {
      this.product = data;

      if (this.editing === false) {
        this.service.createProduct(this.product);
        console.log("creating");
        this.dataSource.push(this.product);
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.editing = true;
      } else {
        this.editing = false;

      }
    });
  }

  ngOnInit() {
    this.service.getAllProducts().subscribe(data => this.dataSource = data);
  }

  createProduct() {
    this.product = new Product();
    this.openDialog();
  }

  startEdit(i: number, p: Product) {
    this.editing = true;
    this.product = p;
    let config = this.getDialogConfig();
    config.data = p;
    this.dialog.open(AddProductComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      // if(result === 1){
      //   const foundIndex = this.dataSource.value.findIndex(x=> x.id === p.id);
      //   this.dataSource.value[foundIndex] = result;
      // }
    })
  }
}
