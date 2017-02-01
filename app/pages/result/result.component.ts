import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Result } from "../../shared/result/result";
import { ResultListService } from "../../shared/result/result-list.service";

@Component({
  selector: "result",
  templateUrl: "pages/result/result.html",
  styleUrls: ["pages/result/result-common.css", "pages/result/result.css"],
  providers: [ResultListService]
})
export class ResultComponent implements OnInit {
  resultList: Array<Result> = [];
  isLoading = false;

  constructor(private resultListService: ResultListService) {}


  ngOnInit() {
  this.isLoading = true;
  this.resultListService.load()
    .subscribe(loadedResults => {
      console.log("entra1" + loadedResults);
      loadedResults.forEach((resultObject) => {
        console.log("entra2" + loadedResults);
        this.resultList.unshift(resultObject);
      });
      this.isLoading = false;
    });
}
}

