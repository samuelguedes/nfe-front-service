import { Duplicata } from "./duplicata.model";

export class NotaFiscal {

    id: number;
    nomeArquivo: string;
    dataHoraRegistro: string;
    nomeEmitente: string;
    nomeDestinatario: string;
    valor: string;
    descricaoStatus: string;
    duplicatas: Duplicata[] = [];
}
