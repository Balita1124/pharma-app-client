import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmaceuticalProductComponent } from './pharmaceutical-product.component';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { DetailProductComponent } from './detail-product/detail-product.component';

@NgModule({
  declarations: [
    PharmaceuticalProductComponent,
    CreateUpdateProductComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  entryComponents: [CreateUpdateProductComponent],
  schemas :  [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmaceuticalProductModule { }
