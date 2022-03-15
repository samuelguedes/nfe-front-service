import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nfe-front-service';
}

@Component({
  selector: 'nota-fiscal',
  templateUrl: './nota-fiscal/nota-fiscal.component.html',
  styleUrls: ['./nota-fiscal/nota-fiscal.component.css']
})
export class NotaFiscalComponent {
  title = 'Nota Fiscal';
}