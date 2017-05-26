/**
 * Clase para mantener el modelado de datos que requiere el individuo en general
 * Extrainfo: es el número de la primer consulta para realiazar las demás peticiones con el mismo
 * nombre de las Listas.
 * listaResultados: aquí se guarda el arreglo de los campos que arroja la consulta a la API REST
 * TotalResultados: de tipo any pero debería se int, guarda el número de resultados de la consulta actual
 * con el fin de que en la Clase del componente se haga una comparacion para determinar si se debe configuar
 * el infinity Scroll ( mayor a 5 resultados se acepta el infinity Scroll).
 */
export class Individuo {
    ExtraInfo: string;
    listaDeResultados: Array<string>;
    TotalResultados: any;

    constructor(ExtraInfo: string, listaDeResultados: any, TotalResultados:any) {
        this.ExtraInfo = ExtraInfo;
        this.listaDeResultados = listaDeResultados;
        this.TotalResultados = TotalResultados;
    }

}
