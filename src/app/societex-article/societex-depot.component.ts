import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SocietexService} from './societex.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CreateUpdateArticleComponent} from './create-update-article/create-update-article.component';
import {ConfirmMessageComponent} from '../shared/confirm-message/confirm-message.component';
import {CreateUpdateDepotComponent} from './create-update-depot/create-update-depot.component';

@Component({
  selector: 'app-societex-depot',
  templateUrl: './societex-depot.component.html',
  styleUrls: ['./societex-depot.component.css']
})
export class SocietexDepotComponent implements OnInit {

  displayColumns;
  itemsNumber = 0;
  depots = [];
  depotFilter = {
    page: 0,
    size: 10,
    direction: 'asc',
    sort: 'name',
    keyword: ''
  };
  resetSearch = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private societexService: SocietexService,
    private matSnackBar: MatSnackBar,
  ) {
    this.displayColumns = [
      {key: 'code', value: 'Code'},
      {key: 'name', value: 'Nom'},
      {key: 'adresse', value: 'Adresse'}
    ];
  }

  ngOnInit(): void {
    this.getDepots();
  }

  getDepots(): void {
    this.societexService.getByParams('/api/depots', this.depotFilter).subscribe(
      res => {
        if (res.success) {
          this.depots = res.data.items;
          this.itemsNumber = res.data.totalItems;
        } else {
          this.matSnackBar.open(res.message, 'Erreur', {
            duration: 3000,
            verticalPosition: 'top'
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
      title: `Création d'un depot`
    };
    const dialogRef = this.matDialog.open(CreateUpdateDepotComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getDepots();
      }
    });
  }

  getDisplayColumns(): string[] {
    return [...this.displayColumns.map(({key}) => key), 'actions'];
  }

  pageChanged({pageSize, pageIndex}) {
    this.depotFilter = {
      ...this.depotFilter,
      page: pageIndex,
      size: pageSize,
    };
    this.getDepots();
  }

  sortChange({direction, active}) {
    this.depotFilter = {
      ...this.depotFilter,
      sort: active,
      direction,
    };
    this.getDepots();
  }

  onSearch() {
    this.getDepots();
  }

  onResetSearch() {
    this.depotFilter.keyword = '';
    this.getDepots();
  }

  needReset() {
  }

  onVisualize(depot) {
    this.router.navigate([`depot/detail`],
      {queryParams: {id: depot.id}});
  }

  onEdit(depot) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: `Modification d'un depot`,
      depot
    };
    const dialogRef = this.matDialog.open(CreateUpdateDepotComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getDepots();
      }
    });
  }

  onDelete(depot) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Confirmation',
      dialogContent: 'Etes-vous sûr de vouloir supprimer ce depot?'
    };
    const dialogRef = this.matDialog.open(ConfirmMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDepot(depot.id);
      }
    });
  }

  deleteDepot(id) {
    this.societexService.delete('/api/depots', id).subscribe(
      res => {
        if (res.success) {
          this.getDepots();
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
