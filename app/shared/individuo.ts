export class Individuo {
    ExtraInfo: string;
    listaDeResultados: any;
    TotalResultados: any;

    constructor(ExtraInfo: string, listaDeResultados: any, TotalResultados:any) {
        this.ExtraInfo = ExtraInfo;
        this.listaDeResultados = listaDeResultados;
        this.TotalResultados = TotalResultados;
    }

}