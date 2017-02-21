import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Search } from "./search";
import { Result } from "../result/result";
import { PepsResults } from "../../pages/result/result.component";

export class PepsResults2 {
    static arrayPersonas: Array<Result>;
    constructor(public title: string, public src: string) { }
}


@Injectable()
export class SearchService {  
  constructor(private http: Http) {}  

  search(searcher: Search) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer "); // + Config.token
    console.log("entra: " + searcher.apiUrl);
    return this.http.get(searcher.apiUrl, {
      headers: headers
    })
    .map(res => res.json()) //RxJS map()para crear un nuevo array con los resultados (Result objects) de la llamada de la funcion.
    .map(data => {
      console.log("resultado de DATA: " + JSON.stringify(data.Resultados));
      let resultList = [];
      data.Resultados.forEach((result) => {
        console.log("resultado de DATA2: " + JSON.stringify(result.NombreCompleto));
        resultList.push(new Result("a","b","c", result.NombreCompleto,"q","f","a",result.Relacionado_Con,"f"));
       // PepsResults2.arrayPersonas.push(new Result("a","b","c", result.NombreCompleto,"q","f","a",result.Relacionado_Con,"f"));
        //console.log("PepsResults2.arrayPersonas: " + JSON.stringify(PepsResults2.arrayPersonas));
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