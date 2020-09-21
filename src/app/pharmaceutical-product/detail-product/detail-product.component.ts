import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  productId;
  product = {
    name: '',
    code: '',
    price: '',
    validityDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params.id || 0;
    });
    if (this.productId) {
      this.getProductById();
    }
  }

  getProductById(): void {
    this.productService.getById('/api/products', this.productId).subscribe(res => {
      if (res.success) {
        this.product = res.data;
      } else {
        this.matSnackBar.open(res.message, 'Erreur', {
          duration: 3000,
          panelClass: ['mat-bar-class']
        });
      }
    });
  }

  onBackPressed(): void {
    this.router.navigate([`product`], {});
  }

}
