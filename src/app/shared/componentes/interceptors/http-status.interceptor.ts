import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MensagemService } from '../../services/mensagem.service';


@Injectable()
export class HTTPStatus {

  private requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  constructor(private status: HTTPStatus) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let newHeaders = req.headers;

    const newReq = req.clone({headers: newHeaders});

    return next.handle(newReq).pipe(
      map(event => {

        if (!newReq.headers.get('ignoreLoading')) {
          this.status.setHttpStatus(true);
        }

        return event;
      }),
      catchError(error => {

        if (error.error instanceof Blob) {
          const reader = new FileReader();

          reader.addEventListener('loadend', (e) => {
            const text = reader.result as string;
            const erro = JSON.parse(text);
            MensagemService.instance.exibirMensagemAtencao(erro.mensagem);
          });

          reader.readAsText(error.error);
        } else {
          if (!!error && !!error.error && error.error.codigoErro === 412) {
            MensagemService.instance.exibirMensagemAtencao(error.error.mensagem);
          } else {
            MensagemService.instance.exibirMensagemErro(error.error.mensagem);
          }
        }

        return throwError(error);
      }),
      finalize(() => {
        if (!newReq.headers.get('ignoreLoading')) {
          this.status.setHttpStatus(false);
        }
      })
    );
  }
}
