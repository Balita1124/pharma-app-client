import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocietexArticleComponent} from './societex-article.component';
import {CreateUpdateArticleComponent} from './create-update-article/create-update-article.component';
import {DetailArticleComponent} from './detail-article/detail-article.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import { SocietexDepotComponent } from './societex-depot.component';
import { CreateUpdateDepotComponent } from './create-update-depot/create-update-depot.component';
import { DetailDepotComponent } from './detail-depot/detail-depot.component';


@NgModule({
  declarations: [
    SocietexArticleComponent,
    CreateUpdateArticleComponent,
    DetailArticleComponent,
    SocietexDepotComponent,
    CreateUpdateDepotComponent,
    DetailDepotComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocietexArticleModule {
}
