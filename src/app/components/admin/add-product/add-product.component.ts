import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl} from '@angular/material';
import {Product} from '../../../models/Product';
import {Observable} from 'rxjs';
import {ProductService} from '../../../services/product.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Category} from '../../../models/Category';
import {SubCategory} from '../../../models/SubCategory';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  createForm: FormGroup;
  submitted = false;
  prod: Product;
  editing: boolean = true;
  product: Product;
  categories: Category[];
  subCategories: SubCategory[];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) private data: Product, private service: ProductService) {

  }

  ngOnInit() {
    this.prod = this.data;
    if(this.prod.name != null){
      this.editing = true;
    }
    else{
      this.editing = false;
    }

    this.createForm = this.fb.group({
      id: [this.prod.id],
      name: [this.prod.name, Validators.required],
      unitPrice: [this.prod.unitPrice, Validators.required],
      description: [this.prod.description, Validators.required],
      photoUrl: [this.prod.photoUrl, Validators.required],
      category: [this.prod.category, Validators.required],
      subCategory: [this.prod.subCategory, Validators.required]
    });

    this.createForm.get('category').valueChanges.subscribe(
      categ => {
        if (categ != '') {
          this.service.searchCategory(categ).subscribe(
            x => {
              this.categories = x as Category[];
            }
          );
        }
      }
    );

    this.createForm.get('subCategory').valueChanges.subscribe(
      subCateg => {
        if(subCateg != ''){
          this.service.searchSubCategories(subCateg).subscribe(
            x => {
              this.subCategories = x as SubCategory[];
            }
          );
        }
      }
    );
  }

  onSubmit() {
    if (this.createForm.valid) {
      this.submitted = true;
      this.fillProduct();
      this.validateAllFormFields(this.createForm);
      if(this.editing == true){
        this.service.updateProduct(this.product).subscribe(x => {})
      }else{
        this.service.createProduct(this.product).subscribe(x => {});
      }
      this.dialogRef.close(this.product);
    } else{
      this.validateAllFormFields(this.createForm);
    }
  }

  getErrorMessage() {
    return this.createForm.hasError('required') ? 'Required field' : '';
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  fillProduct() {
    this.product = new Product();
    this.product.id = this.createForm.get('id').value;
    this.product.name = this.createForm.get('name').value;
    this.product.unitPrice = this.createForm.get('unitPrice').value;
    this.product.description = this.createForm.get('description').value;
    this.product.photoUrl = this.createForm.get('photoUrl').value;
    this.product.category = this.createForm.get('category').value;
    this.product.subCategory = this.createForm.get('subCategory').value;
  }

  close() {
    this.dialogRef.close(new Product());
  }

}

