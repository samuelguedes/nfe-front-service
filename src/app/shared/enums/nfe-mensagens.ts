export class NFeMensagens {

  MSG000 = 'Tem certeza que deseja excluir a nota fical?';
  MSG001 = 'Nota fiscal excluída com sucesso.';
  


  static comParametros(mensagem: string, ...parametros: string[]): string {
    let mensagemFinal = '';
    parametros.forEach((parametro, i) => {
      mensagemFinal = mensagem.replace(`{${i}}`, parametro);
    });

    return mensagemFinal;
  }

  static acceptRejectLabels(acceptLabel: string, rejectLabel: string) {
    return {
      acceptLabel,
      rejectLabel,
    };
  }

  static OnlyRejectLabel(rejectLabel: string) {
    return {
      rejectLabel,
    };
  }

  static confirmarCancelarLabels() {
    return this.acceptRejectLabels('Confirmar', 'Cancelar');
  }

  static simNaoLabels() {
    return this.acceptRejectLabels('Sim', 'Não');
  }

  static okLabel() {
    return this.acceptRejectLabels('Ok', 'Sim');
  }

}
