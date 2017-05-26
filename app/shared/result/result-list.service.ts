import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Result } from "./result";
import { Search } from "../search/search";


@Injectable()
/**
 * Servicio que hace la consulta a la REST para extraer
 * nuevos registros cuando se hace scroll después los primeros resultados.
 */
export class ResultListService {
  constructor(private http: Http) { }
  /**
   * Funcion que busca devolver un array de identidades de personas de un resultado consultado.
   * Se agregan como parámetro un buscardor "searcher" que es un objeto con la url preparada para
   * la búsqueda del contenido necesario de la rest y un array de personas el cual puede venir vacío
   * o con datos, dependiendo si el usauario ha hecho uso del recurso del infinity scroll.
   * @param searcher {any}
   * @param individuoArray {any} 
   * @return resultList {Array}
   */
  load(searcher: Search, individuoArray: any) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer ");  // + Config.token
    
    return this.http.get(searcher.apiUrl, {
      headers: headers
    })
      .map(res => res.json()) //RxJS map()para crear un nuevo array con los resultados (Result objects) de la llamada de la funcion.
      .map(data => {
        let resultList = [];
        data.Resultados.forEach((result) => {
          // El es array construido para retornar
          resultList.push(new Result("fuente", "b", "c", result.NombreCompleto, result.Origen_Lista, result.Tipo_Lista, result.Tipo_Persona, result.Relacionado_Con, "f"));
          // Agrega los nuevos resultados al array general, el cual se necesita para mostrar los resultados en la vista
          // details para el horizontal scroll.
          individuoArray.push(new Result("fuente", "b", "c", result.NombreCompleto, result.Origen_Lista, result.Tipo_Lista, result.Tipo_Persona, result.Relacionado_Con, "f"));
        });
        return resultList;
      })
      .catch(this.handleErrors);
  }
  /** Se manejan los errores resultantes del Observable */
  handleErrors(error: Response) {
    console.log("error: " + JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}