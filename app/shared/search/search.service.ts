import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Search } from "./search";
import { Result } from "../result/result";

import { Individuo } from "../individuo";


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
        //console.log("resultado de DATA2: " + JSON.stringify(result.NombreCompleto));       
        resultList.push(new Result("fuente","b","c", result.NombreCompleto, result.Origen_Lista, result.Tipo_Lista, result.Tipo_Persona,result.Relacionado_Con,"f"));        
       });
       var resultInstance = new Individuo(data.ExtraInfo, resultList, data.TotalResultados);
      // resultInstance.ExtraInfo = data.ExtraInfo;
      console.log("resultado de result: " + resultList);
      //return resultList;
      return resultInstance;
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