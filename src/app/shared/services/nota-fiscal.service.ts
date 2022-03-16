import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NotaFiscal } from '../models/nota-fiscal.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscaLService extends BaseService {


  private readonly APIreport = `${environment.URL_BACKEND_NFE_PROCESS_SERVICE}notas-fiscais`;

  constructor(private http: HttpClient) {
    super();
  }

  listarNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(`${this.APIreport}`);
  }

  remover(id: number): Observable<NotaFiscal> {
    return this.http.delete<any>(`${this.APIreport}/${id}`);
  }

}
