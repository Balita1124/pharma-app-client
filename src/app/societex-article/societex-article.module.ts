import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocietexArticleComponent} from './societex-article.component';
import {CreateUpdateArticleComponent} from './create-update-article/create-update-article.component';
import {DetailArticleComponent} from './detail-article/detail-article.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';


@NgModule({
  declarations: [
    SocietexArticleComponent,
    CreateUpdateArticleComponent,
    DetailArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  entryComponents: [CreateUpdateArticleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocietexArticleModule {
}
