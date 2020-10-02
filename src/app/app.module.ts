import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PharmaceuticalProductModule } from './pharmaceutical-product/pharmaceutical-product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmMessageComponent } from './shared/confirm-message/confirm-message.component';
import { ProductService } from './service/product.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from './service/loading.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {SocietexGeneralModule} from './societex-general/societex-general.module';
import {MatMenuModule} from '@angular/material/menu';

registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PharmaceuticalProductModule,
    SocietexGeneralModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmMessageComponent]
})
export class AppModule { }
