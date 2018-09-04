import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  prod: Product;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  addProduct() {
    this.router.navigate(['add-product']);
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

}

export class DialogOverViewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverViewExampleDialog>,@Inject(MAT_DIALOG_DATA) public data: Product){}


}
