import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {PharmaceuticalProductComponent} from './pharmaceutical-product/pharmaceutical-product.component';
import {DetailProductComponent} from './pharmaceutical-product/detail-product/detail-product.component';
import {MainComponent} from './societex-general/common/main.component';


const routes: Routes = [
    {path: '', redirectTo: 'accueil', pathMatch: 'full'},
    {
      path: 'product', children:
        [
          {path: '', component: PharmaceuticalProductComponent},
          {path: 'detail', component: DetailProductComponent}
        ]
    },
    {path: 'accueil', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
