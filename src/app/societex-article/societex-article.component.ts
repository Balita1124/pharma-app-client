import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProductService} from '../service/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmMessageComponent} from '../shared/confirm-message/confirm-message.component';
import {CreateUpdateArticleComponent} from './create-update-article/create-update-article.component';
import {SocietexService} from './societex.service';

@Component({
  selector: 'app-societex-article',
  templateUrl: './societex-article.component.html',
  styleUrls: ['./societex-article.component.css']
})
export class SocietexArticleComponent implements OnInit {


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
    private societexService: SocietexService,
    private matSnackBar: MatSnackBar,
  ) {
    this.displayColumns = [
      {key: 'name', value: 'Nom'},
      {key: 'code', value: 'Code'},
      {key: 'priceUnit', value: 'Prix Unitaire'},
      {key: 'pricePurchaseAverage', value: 'Prix moyen de vente'},
      {key: 'productType', value: 'Type de produit'},
      {key: 'validityDate', value: 'Date de validité'},
      {key: 'width', value: 'Largeur'},
      {key: 'weight', value: 'Hauteur'},
      {key: 'length', value: 'Longueur'},
      {key: 'watt', value: 'Puissance'}
    ];
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    this.societexService.getByParams('/api/machines', this.productFilter).subscribe(
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
      title: `Création d'un article`
    };
    const dialogRef = this.matDialog.open(CreateUpdateArticleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getArticle();
      }
    });
  }

  getDisplayColumns(): string[] {
    return [...this.displayColumns.map(({key}) => key), 'actions'];
  }

  pageChanged({pageSize, pageIndex}) {
    this.productFilter = {
      ...this.productFilter,
      page: pageIndex,
      size: pageSize,
    };
    this.getArticle();
  }

  sortChange({direction, active}) {
    this.productFilter = {
      ...this.productFilter,
      sort: active,
      direction,
    };
    this.getArticle();
  }

  onSearch() {
    this.getArticle();
  }

  onResetSearch() {
    this.productFilter.keyword = '';
    this.getArticle();
  }

  needReset() {
  }

  onVisualize(product) {
    this.router.navigate([`product/detail`],
      {queryParams: {id: product.id}});
  }

  onEdit(product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: `Modification d'un article`,
      product
    };
    const dialogRef = this.matDialog.open(CreateUpdateArticleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getArticle();
      }
    });
  }

  onDelete(product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Confirmation',
      dialogContent: 'Etes-vous sûr de vouloir supprimer cet article?'
    };
    const dialogRef = this.matDialog.open(ConfirmMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(product.id);
      }
    });
  }

  deleteProduct(id) {
    this.societexService.delete('/api/products', id).subscribe(
      res => {
        if (res.success) {
          this.getArticle();
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
