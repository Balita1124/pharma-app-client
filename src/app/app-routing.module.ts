import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {PharmaceuticalProductComponent} from './pharmaceutical-product/pharmaceutical-product.component';
import {DetailProductComponent} from './pharmaceutical-product/detail-product/detail-product.component';
import {MainComponent} from './societex-general/common/main.component';
import {SocietexArticleComponent} from './societex-article/societex-article.component';
import {SocietexDepotComponent} from './societex-article/societex-depot.component';
import {CreateUpdateArticleComponent} from './societex-article/create-update-article/create-update-article.component';


const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {
    path: 'article', children:
      [
        {path: '', component: SocietexArticleComponent},
        {path: 'add', component: CreateUpdateArticleComponent},
        {path: 'detail', component: DetailProductComponent}
      ]
  },
  {
    path: 'depot', children:
      [
        {path: '', component: SocietexDepotComponent},
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
