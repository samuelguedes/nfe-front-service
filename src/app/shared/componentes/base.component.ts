import { OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { NFeMensagens } from '../enums/nfe-mensagens';
import { MensagemService } from '../services/mensagem.service';
import { NFeUtils } from '../utils/nfe-utils';
import { LoadingService } from './loading.service';

export class BaseComponent implements OnDestroy {

    ngUnsubscribe = new Subject();

    mensagens = new NFeMensagens();

    ptbr = NFeUtils.calendarioPTBR();

    protected showMessageSucess(detail: string) {
        MensagemService.instance.exibirMensagemSucesso(detail);
    }

    protected showMessageWarn(detail: string) {
        MensagemService.instance.exibirMensagemAtencao(detail);
    }

    protected showMessageError(detail: string) {
        MensagemService.instance.exibirMensagemErro(detail);
    }

    protected showMessage(summary: string, detail: string, severity: string) {
        MensagemService.instance.exibirMensagem(summary, detail, severity);
    }

    protected scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    protected forceValidateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl && control.enabled) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.forceValidateAllFormFields(control);
            }
        });
    }

    protected atLeastOneFieldValid(formGroup: FormGroup): boolean {
        const result = Object.keys(formGroup.controls).some(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl && control.enabled && control.value) {
                return true;
            } else if (control instanceof FormGroup) {
                if (this.atLeastOneFieldValid(control)) {
                    return true;
                }
            }
        });
        return result;
    }

    protected download(nome: string, blob: any): void {

        const urlDownload = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = urlDownload;
        link.download = nome;
        link.click();
        setTimeout(() => window.URL.revokeObjectURL(urlDownload), 0);
    }

    somenteNumero(event: KeyboardEvent) {
        const pattern = /[0-9\+]/;
        this.validarDeAcordoComPattern(event, pattern);
    }

    somenteNumeroETraco(event: KeyboardEvent) {
        const pattern = /^[0-9 -]+$/;
        this.validarDeAcordoComPattern(event, pattern);
    }

    private validarDeAcordoComPattern(event: any, pattern: RegExp) {
        const inputChar = String.fromCharCode(event.charCode);
        if (!this.isEventoIgnorado(event) && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    private isEventoIgnorado(event): boolean {
        const eventoSetasETab = 0;
        const eventoBackspace = 8;
        return event.which === eventoSetasETab || event.which === eventoBackspace;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        LoadingService.instance.enableLoadingHttp();
    }


    public mergeArrays(...arrays): any[] {
        let jointArray = [];

        arrays.forEach(array => {
            jointArray = [...jointArray, ...array];
        });
        return jointArray.filter((item, index) => jointArray.indexOf(item) === index);
    }

    public substractArray(arrayTotal: any[], arrayRemove: any[]): any[] {
        return arrayTotal.filter( x => !arrayRemove.includes(x) );
    }
}
