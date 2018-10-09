import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../models/product/Product';
import {ProductService} from '../../../services/product/product.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  pageSize = 5;
  currentPage = 0;
  totalSize: number = 0;
  products: Product[] = [];
  product: Product;
  dialogRef: MatDialogRef<AddProductComponent>;
  dataSource: MatTableDataSource<Product>;
  public displayedColumns = ['name', 'unitPrice', 'description', 'category', 'subCategory', 'photoUrl', 'actionsColumn'];
  editing = false;
  index: number;


  constructor(private service: ProductService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getProductsOfPage(this.currentPage + 1, this.pageSize).subscribe(result => {
      this.products = result.data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.totalSize = result.count;
    });
  }

  getDialogConfig(){
    const dialogConfig = new MatDialogConfig<Product>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '570px';
    dialogConfig.width = '450px';
    return dialogConfig;
  }

  handlePage(event: any){
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.service.getProductsOfPage(this.currentPage + 1, this.pageSize).subscribe(result => {
      this.products = result.data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.totalSize = result.count;
    });
  }

  createProduct() {
    this.product = new Product();
    let config = this.getDialogConfig();
    config.data = this.product;
    this.dialogRef = this.dialog.open(AddProductComponent, config);
    this.dialogRef.afterClosed().subscribe(data => {
      this.product = data;
      if(this.product.id != undefined){
        this.products.push(this.product);
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.editing = true;
        this.service.getCategoriesAndSubCategories().subscribe(result => {
          this.service.categories.next(result);
        })
      }
    })
  }

  startEdit(i: number, p: Product) {
    this.editing = true;
    this.product = p;
    let config = this.getDialogConfig();
    config.height = '510px';
    config.data = p;
    this.dialogRef = this.dialog.open(AddProductComponent, config);
    this.dialogRef.afterClosed().subscribe(data => {
      this.product = data;
      this.products[i] = this.product;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.editing = false;
    })
  }

  delete(i: number, p: Product){
    this.service.deleteProduct(p.id).do(console.log).subscribe(x => {
      this.totalSize -= 1;
    });
    this.products.splice(i, 1);
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }
}
