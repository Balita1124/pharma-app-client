import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ProductService} from 'src/app/service/product.service';
import {DateAdapter} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.css']
})
export class CreateUpdateProductComponent implements OnInit {

  productForm: FormGroup;
  REQUIRED_MESSAGE = 'Ce champ est requis';
  minDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('fr');
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      validityDate: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.minDate = moment(new Date()).add(1, 'day').toDate();
    const {product} = this.data;
    if (product) {
      this.initEditForm(product);
    }
  }

  initEditForm(product) {
    const {id, validityDate, ...res} = product;
    this.productForm.setValue({
      ...res,
      validityDate: moment(validityDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
    });
  }

  onSave() {
    const formValue = this.productForm.getRawValue();
    const data = {
      ...formValue,
      validityDate: moment(formValue.validityDate).format('DD-MM-YYYY')
    };
    if (this.productForm.valid) {
      const observable = this.data.product ? this.productService.update('/api/products', data, this.data.product.id) :
        this.productService.create('/api/products', data);
      observable.subscribe(res => {
        if (res.success) {
          this.matSnackBar.open(res.message, 'Succès', {
            duration: 3000,
            panelClass: ['mat-bar-class'],
            verticalPosition: 'top'
          });
        } else {
          let message = '';
          if (res.data && res.data.errors) {
            res.data.errors.map(error => {
              message += message.length > 0 ? `; ${error.errorMessage}` : error.errorMessage;
            });
          }
          this.matSnackBar.open(message, 'Erreur', {
            duration: 3000,
            panelClass: ['mat-bar-class'],
            verticalPosition: 'top'
          });
        }
        // this.matDialog.closeAll();
      });
    }
  }

  onKeyPress(event) {
    const {key, target: {value: inputValue, selectionStart}} = event;
    const value = [...inputValue.slice(0, selectionStart), key, ...inputValue.slice(selectionStart)].join('');
    return /^\d+([\.\,]\d*)?$/.test(value);
  }

}
