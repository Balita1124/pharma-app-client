import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PharmaceuticalProductComponent } from './pharmaceutical-product/pharmaceutical-product.component';
import { DetailProductComponent } from './pharmaceutical-product/detail-product/detail-product.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: '',
      redirectTo: 'product',
      pathMatch: 'full'
    },
    {
      path: 'product',
      children : [
        {
          path: '',
          component: PharmaceuticalProductComponent,
        },
        {
          path: 'detail',
          component: DetailProductComponent,
        }
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
