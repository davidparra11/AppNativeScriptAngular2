import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Result } from "./result";
import { Search } from "../search/search";


@Injectable()
export class ResultListService {
  constructor(private http: Http) {}
    
  load(searcher: Search, individuoArray: any) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer ");  // + Config.token
    console.log("entra a result list service con la api: " +  searcher.apiUrl);
    return this.http.get(searcher.apiUrl, {
      headers: headers
    })
    .map(res => res.json()) //RxJS map()para crear un nuevo array con los resultados (Result objects) de la llamada de la funcion.
    .map(data => {
      console.log("resultado de DATA List: " + data.Resultados);
      let resultList = [];
      data.Resultados.forEach((result) => {
        console.log("En el array list: " + result.NombreCompleto);
        resultList.push(new Result("fuente","b","c", result.NombreCompleto, result.Origen_Lista, result.Tipo_Lista, result.Tipo_Persona,result.Relacionado_Con,"f"));
        individuoArray.push(new Result("fuente","b","c", result.NombreCompleto, result.Origen_Lista, result.Tipo_Lista, result.Tipo_Persona,result.Relacionado_Con,"f"));
      });
      console.log("resultado de result: " + resultList);
      return resultList;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log("error: " + JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  showConsole(variable){

  }
}