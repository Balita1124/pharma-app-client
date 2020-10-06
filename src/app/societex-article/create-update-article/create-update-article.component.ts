import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductService} from '../../service/product.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DateAdapter} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-update-article',
  templateUrl: './create-update-article.component.html',
  styleUrls: ['./create-update-article.component.css']
})
export class CreateUpdateArticleComponent implements OnInit {

  articleForm: FormGroup;
  REQUIRED_MESSAGE = 'Ce champ est requis';
  minDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private productService: ProductService,
    private matDialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('fr');
    this.articleForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      validityDate: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.minDate = moment(new Date()).add(1, 'day').toDate();
  }

  onSave() {
    const formValue = this.articleForm.getRawValue();
    const data = {
      ...formValue,
      validityDate: moment(formValue.validityDate).format('DD-MM-YYYY')
    };
    if (this.articleForm.valid) {
      const observable = this.productService.create('/api/products', data);
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
