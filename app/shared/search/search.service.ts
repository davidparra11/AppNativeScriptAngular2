import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Search } from "./search";
import { Result } from "../result/result";

import { Individuo } from "../individuo";

/**
 * Servicio que hace la consulta a la REST para extraer
 * nuevos registros en el instante que el cliente hace una búsqueda.
 */
@Injectable()
export class SearchService {
  constructor(private http: Http) { }
  /**
   * Función que busca devolver una instancia de la clase Individuo de un resultado consultado.
   * Se agregan como parámetro un buscardor "searcher" que es una instancia con la url preparada para
   * la búsqueda del contenido necesario de la rest
   * @param searcher {any}
   * @return resultInstance {Individuo}
   */
  search(searcher: Search) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer "); // + Config.token
    return this.http.get(searcher.apiUrl, {
      headers: headers
    })
      .map(res => res.json()) //RxJS map()para crear un nuevo array con los resultados (Result objects) de la llamada de la funcion.
      .map(data => {
        let resultList = [];

        data.Resultados.forEach((result) => {
          // Array a agrear a la instancia de la clase Individuo donde la propiedad es un Array (listaDeResultados)     
          resultList.push(new Result("fuente", "test", "test", result.NombreCompleto, result.Origen_Lista, result.Tipo_Lista, result.Tipo_Persona, result.Relacionado_Con, "f"));
        });
        // nueva instancia de la clase individuo
        var resultInstance = new Individuo(data.ExtraInfo, resultList, data.TotalResultados);

        return resultInstance;
      })
      .catch(this.handleErrors);
  }
  /**
   * Se manejan los errores resultantes del Observable.
   * @param error 
   */
  handleErrors(error: Response) {
    console.log("error: " + JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}