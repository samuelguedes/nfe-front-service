import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public static instance: LoadingService;

  private subjectLoading = new Subject<boolean>();
  observableLoading = this.subjectLoading.asObservable();

  private subjectLoadingHttp = new Subject<boolean>();
  observableLoadingHttp = this.subjectLoadingHttp.asObservable();


  constructor() {
    LoadingService.instance = this;
  }

  show() {
    setTimeout(() => this.subjectLoading.next(true), 0);
  }

  hide() {
    setTimeout(() => this.subjectLoading.next(false), 0);
  }

  showNoTimeout() {
    this.subjectLoading.next(true);
  }

  hideNoTimeout() {
    this.subjectLoading.next(false);
  }

  enableLoadingHttp() {
    setTimeout(() => this.subjectLoadingHttp.next(true), 0);
  }

  enableLoadingHttpNoTimeout() {
    this.subjectLoadingHttp.next(true);
  }

  disableLoadingHttp() {
    setTimeout(() => this.subjectLoadingHttp.next(false), 0);
  }

}
