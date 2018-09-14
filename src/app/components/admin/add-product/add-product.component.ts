import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Product} from '../../models/Product';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  prod: Product;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) data: Product) {
    this.prod = data;
  }

  ngOnInit() {
    this.form = this.formBuilder.group(this.prod)
  }

  save(){
    this.dialogRef.close(this.form.value);
  }

  close(){
    this.dialogRef.close();
  }
  // addProduct() {
  //   this.router.navigate(['add-product']);
  // }
  //
  // onNoClick(): void {
  //   this.dialog.closeAll();
  // }

}

export class DialogOverViewExampleDialog {
  constructor(private dialogRef: MatDialogRef<AddProductComponent>,@Inject(MAT_DIALOG_DATA) public data: Product){}


}
