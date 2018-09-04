import {Component, Inject, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Product[];
  prod: Product;

  constructor(private router: Router, private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  addProduct() {
    this.router.navigate(['add-product']);
  }

  editProduct(product: Product) {
    localStorage.removeItem("editProductId");
    localStorage.setItem("editProductId", product.id.toString());
    this.router.navigate(['edit-product']);

  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id)
      .subscribe(data => {
        this.products = this.products.filter(p => p !== product);
      })
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverViewExampleDialog,{
      width: '300px',
      data: this.prod
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.prod = result;
    });
  }
}

export class DialogOverViewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverViewExampleDialog>,@Inject(MAT_DIALOG_DATA) public data: Product){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
