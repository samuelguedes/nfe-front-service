import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class MensagemService {


  public static instance: MensagemService;

  constructor(private messageService: MessageService) {
    MensagemService.instance = this;
  }

  init() {
    console.log('message initialize');
  }

  exibirMensagemSucesso(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail });
  }

  exibirMensagemAtencao(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Atenção', detail });
  }

  exibirMensagemErro(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }

  exibirMensagem(summary: string, detail: string, severity: string) {
    this.messageService.add({ severity, summary, detail });
  }

}
