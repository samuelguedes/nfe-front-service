import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { NotaFiscalComponent } from './nota-fiscal/nota-fiscal.component';
import { DuplicataComponent } from './duplicata/duplicata.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HTTPListener, HTTPStatus } from './shared/componentes/interceptors/http-status.interceptor';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MensagemService } from './shared/services/mensagem.service';
import { BaseComponent } from './shared/componentes/base.component';

const rxjsServices = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    NotaFiscalComponent,
    DuplicataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    PaginatorModule,
    FileUploadModule,
    PanelModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MessagesModule
  ],
  providers: [  rxjsServices,
                MessageService,
                MensagemService,
                ConfirmationService,
               {
                 provide: HTTP_INTERCEPTORS,
                 useClass: HTTPListener,
                 multi: true
               }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
