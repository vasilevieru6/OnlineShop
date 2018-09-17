import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl} from '@angular/material';
import {Product} from '../../../models/Product';
import {Observable} from 'rxjs';
import {ProductService} from '../../../services/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  createProductForm: FormGroup;
  formControl: FormControl;
  submitted = false;
  prod: Product;
  product: Product;
  private formSubmitAttempt: boolean;
  filteredCategories: Observable<string[]>;
  filteredSubcategories: Observable<string[]>;
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) private data, private sevice: ProductService) {
    this.formControl = new FormControl("",[Validators.required]);

  }

  ngOnInit() {
    this.prod = this.data;
  }

  // get f(){ return this.createProductForm.controls; }

  onSubmit(){
    this.submitted = true;
  }

  getErrorMessage(){ return this.formControl.hasError('required') ? 'Required field' : ''; }

  // isFieldInvalid(field: string) { // {6}
  //   return (
  //     (!this.createProductForm.get(field).valid && this.createProductForm.get(field).touched) ||
  //     (this.createProductForm.get(field).untouched && this.formSubmitAttempt) || (!this.createProductForm.get(field).value)
  //   );
  // }

  save(){
    this.fillProduct();
    this.dialogRef.close(this.product);
  }

  fillProduct(){
    this.product = new Product();
    //this.product.id = this.formControl.get('id').value;
    this.product.name = this.formControl.value.name;
    this.product.unitPrice = this.formControl.value.unitPrice;
    this.product.description = this.formControl.value.description;
    this.product.photoUrl = this.formControl.value.photoUrl;
    this.product.category = this.formControl.value.category;
    this.product.subCategory = this.formControl.value.subCategory;
  }

  close(){
    this.dialogRef.close();
  }

}

