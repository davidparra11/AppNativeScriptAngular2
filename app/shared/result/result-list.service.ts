import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Result } from "./result";

@Injectable()
export class ResultListService {
  constructor(private http: Http) {}

  load() {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);

    return this.http.get(Config.apiUrl + "Results", {
      headers: headers
    })
    .map(res => res.json()) //RxJS map()para crear un nuevo array con los resultados (Result objects) de la llamada de la funcion.
    .map(data => {
      let resultList = [];
      data.Result.forEach((result) => {
        resultList.push(new Result(result.Id, result.Name));
      });
      return resultList;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}