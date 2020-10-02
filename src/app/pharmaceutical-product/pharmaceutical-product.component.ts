import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { ConfirmMessageComponent } from '../shared/confirm-message/confirm-message.component';
import { ProductService } from '../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pharmaceutical-product',
  templateUrl: './pharmaceutical-product.component.html',
  styleUrls: ['./pharmaceutical-product.component.css']
})
export class PharmaceuticalProductComponent implements OnInit {

  displayColumns;
  itemsNumber = 0;
  products = [];
  productFilter = {
    page: 0,
    size: 10,
    direction: 'asc',
    sort: 'name',
    keyword: '',
  };
  resetSearch = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private productService: ProductService,
    private matSnackBar: MatSnackBar,
  ) {
    this.displayColumns = [
      { key: 'name', value: 'Nom' },
      { key: 'code', value: 'Code' },
      { key: 'validityDate', value: 'Date de validité' },
      { key: 'price', value: 'Prix de vente' }
    ];
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getByParams('/api/products', this.productFilter).subscribe(
      res => {
        if (res.success) {
          this.products = res.data.items;
          this.itemsNumber = res.data.totalItems;
        } else {
          this.matSnackBar.open(res.message, 'Erreur', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
    );
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: `Création d'un produit pharmaceutique`
    };
    const dialogRef = this.matDialog.open(CreateUpdateProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getProduct();
      }
    });
  }

  getDisplayColumns(): string[] {
    return [...this.displayColumns.map(({ key }) => key), 'actions'];
  }

  pageChanged({ pageSize, pageIndex }) {
    this.productFilter = {
      ...this.productFilter,
      page: pageIndex,
      size: pageSize,
    };
    this.getProduct();
  }

  sortChange({ direction, active }) {
    this.productFilter = {
      ...this.productFilter,
      sort: active,
      direction,
    };
    this.getProduct();
  }

  onSearch() {
    this.getProduct();
  }

  onResetSearch() {
    this.productFilter.keyword = '';
    this.getProduct();
  }

  needReset(){
  }

  onVisualize(product) {
    this.router.navigate([`product/detail`],
      { queryParams: { id: product.id } });
  }

  onEdit(product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: `Modification d'un produit pharmaceutique`,
      product
    };
    const dialogRef = this.matDialog.open(CreateUpdateProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getProduct();
      }
    });
  }

  onDelete(product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Confirmation',
      dialogContent: 'Etes-vous sûr de vouloir supprimer ce produit?'
    };
    const dialogRef = this.matDialog.open(ConfirmMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(product.id);
      }
    });
  }

  deleteProduct(id) {
    this.productService.delete('/api/products', id).subscribe(
      res => {
        if (res.success) {
          this.getProduct();
          this.matSnackBar.open(res.message, 'Succès', {
            duration: 3000,
            panelClass: ['mat-bar-class']
          });
        } else {
          this.matSnackBar.open(res.message, 'Erreur', {
            duration: 3000,
            panelClass: ['mat-bar-class']
          });
        }
      }
    );
  }

}
