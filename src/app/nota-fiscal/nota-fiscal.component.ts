import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { BaseComponent } from '../shared/componentes/base.component';
import { NotaFiscal } from '../shared/models/nota-fiscal.model';
import { NotaFiscaLService } from '../shared/services/nota-fiscal.service';

@Component({
  selector: 'app-nota-fiscal',
  templateUrl: './nota-fiscal.component.html',
  styleUrls: ['./nota-fiscal.component.css']
})
export class NotaFiscalComponent extends BaseComponent implements OnInit {

  notasFiscais: NotaFiscal[] = [];

  arquivos:File[] = [];

  constructor(
    private location: Location,
    private confirmationService: ConfirmationService,
    private notaFiscalService: NotaFiscaLService
  ) {
    super();
  }

  enviarArquivo(event:Event): void {

  }

  ngOnInit() {
    this.listarNotasFiscais();
  }

  listarNotasFiscais() {
    this.notaFiscalService.listarNotasFiscais()
      .pipe(take(1))
      .subscribe(resposta => {
        this.notasFiscais = resposta;
      });
  }

  remover(id:number) {
    this.confirmationService.confirm({
      key: 'confirmacao',
      header: 'Excluir Nota Fiscal',
      message: this.mensagens.MSG000,
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.notaFiscalService.remover(id).subscribe(sucess => {
          this.showMessageSucess(this.mensagens.MSG001);
          this.voltar();
        });
      }
    });
  }

  voltar() {
    this.location.back();
  }

  abrirDuplicatas() {
    
  }

}
