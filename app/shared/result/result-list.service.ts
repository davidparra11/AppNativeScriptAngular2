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
  
  

  
  load(searcher: Search) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer ");  // + Config.token
    console.log("entra a result list service");
    return this.http.get(searcher.apiUrl, {
      headers: headers
    })
    .map(res => res.json()) //RxJS map()para crear un nuevo array con los resultados (Result objects) de la llamada de la funcion.
    .do(data => {
      console.log("resultado de DATA: " + data.Resultados);
      let resultList = [];
      data.Resultados.forEach((result) => {
        console.log("En el array: " + result.NombreCompleto);
        resultList.push(new Result("a","b","c", result.NombreCompleto,"q","f","a",result.Relacionado_Con,"f"));
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