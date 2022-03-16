import { HttpHeaders, HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

export abstract class BaseService {

  construirParametrosAny(params: {}, httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }

    Object.keys(params).forEach(chave => {
      const valor = params[chave];

      if (this.isLista(valor)) {
        valor.forEach(item => httpParams = httpParams.append(chave, item));
      } else if (!isNullOrUndefined(valor) && valor.toString().trim() !== '') {
        httpParams = httpParams.append(chave, valor.toString());
      }
    });

    return httpParams;
  }

  public get headersIgnoreLoading(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('ignoreLoading', 'true');
    return headers;
  }

  private isLista(valor: any): boolean {
    return Array.isArray(valor) && valor.length > 0;
  }

  private isFiltro(chave: string): boolean {
    return chave === 'filtro';
  }

}
