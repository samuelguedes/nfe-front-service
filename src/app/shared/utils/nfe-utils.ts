import * as _ from 'lodash';


export class NFeUtils {

  static calendarioPTBR() {
    return {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  static getDataAsString(data: Date, comHoras: boolean): string {
    if (!data) { return null; }
    const dia: string = this.formatarNumeroParaString(data.getDate());
    const mes: string = this.formatarNumeroParaString(data.getMonth() + 1);
    const ano: string = this.formatarNumeroParaString(data.getFullYear());
    const horas: string = comHoras ? this.formatarNumeroParaString(data.getHours()) : '00';
    const minutos: string = comHoras ? this.formatarNumeroParaString(data.getMinutes()) : '00';
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  static getSomenteDataAsString(data: Date): string {
    return this.getDataAsString(data, false).substring(0, 10);
  }

  static getDataCompletaAsString(data: Date): string {
    if (!data) { return null; }
    const dataString = this.getDataAsString(data, true);
    const segundos: string = this.formatarNumeroParaString(data.getSeconds()) || '00';

    return `${dataString}:${segundos}`;
  }

  static getStringAsData(data: string): Date {
    if (!data) { return null; }
    const dia: number = +data.substring(0, 2);
    const mes: number = (+data.substring(3, 5)) - 1;
    const ano: number = +data.substring(6, 10);
    const horas: number = +data.substring(11, 13);
    const minutos: number = +data.substring(14, 16);
    return new Date(
      ano, mes, dia, horas, minutos
    );
  }

  static getDataAsStringPadraoInternacional(data: Date, comHoras: boolean): string {
    if (!data) { return null; }
    const dia: string = this.formatarNumeroParaString(data.getDate());
    const mes: string = this.formatarNumeroParaString(data.getMonth() + 1);
    const ano: string = this.formatarNumeroParaString(data.getFullYear());
    if (comHoras) {
      const horas: string = this.formatarNumeroParaString(data.getHours()) || '00';
      const minutos: string = this.formatarNumeroParaString(data.getMinutes()) || '00';
      const segundos: string = this.formatarNumeroParaString(data.getSeconds()) || '00';
      return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }
    return `${ano}-${mes}-${dia}`;
  }

  static formatarNumeroParaString(numero: number): string {
    if (this.isApenasUmDigito(numero)) {
      return `0${numero.toString()}`;
    }
    return numero.toString();
  }
  static isApenasUmDigito(numero: number): boolean {
    return numero.toString().length === 1;
  }

  static base64ToFile(strBase64: string, nome: string): File {
    // extract content type and base64 payload from original string
    const pos = strBase64.indexOf(';base64,');
    const type = strBase64.substring(5, pos);
    const b64 = strBase64.substr(pos + 8);

    // decode base64
    const imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    const blob = new Blob([buffer], { type });

    return new File([blob], nome, { type });
  }

  static removerAcentosECaracteresEspeciais(nome: string): string {
    return NFeUtils.removerAcentos(nome)
      .replace(/[^a-z0-9A-Z.\-_\s]/g, ''); // Remove caracteres especiais, exceto ['.', '-', '_', ' ']
  }

  static removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  static toUpperCaseRemoverAcentos(texto: string): string {
    return this.removerAcentos(texto).toUpperCase();
  }

  static sortAutoComplete(array: any[], field: string): any[] {
    return _.sortBy(array, field);
  }

  static calcDias(dias: number): number {
    return (dias * 24 * 60 * 60 * 1000);
  }



  static converterDataStringCodificadaParaURL(data: Date): string {
    return (data)
      ? encodeURIComponent(NFeUtils.getDataAsString(new Date(data), false))
      : null;
  }

  static primeiraLetraMaiuscula(str) {
    return str.replace(/\w\S*/g, (txt)  => {
      if (this.allTextIsUpper(txt)) {
        return txt;
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static allTextIsUpper(str) {
    return (str === str.toUpperCase());
  }

  static includesIgnorandoCase(valor1: string, valor2: string): boolean {
    return this.toUpperCaseRemoverAcentos(valor1).includes(this.toUpperCaseRemoverAcentos(valor2));
  }

  static isNotNullAndNotUndefined(i: any){
    return i !== null && i !== undefined;
  }

}
