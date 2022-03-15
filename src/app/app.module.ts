import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotaFiscalComponent } from './nota-fiscal/nota-fiscal.component';
import { DuplicataComponent } from './duplicata/duplicata.component';

@NgModule({
  declarations: [
    AppComponent,
    NotaFiscalComponent,
    DuplicataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
