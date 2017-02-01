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

  constructor(private resultListService: ResultListService) {}


  ngOnInit() {
  this.resultListService.load()
    .subscribe(loadedResults => {
      loadedResults.forEach((resultObject) => {
        this.resultList.unshift(resultObject);
      });
    });
}
}

