import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "result",
  templateUrl: "pages/result/result.html",
  styleUrls: ["pages/result/result-common.css", "pages/result/result.css"]
})
export class ResultComponent implements OnInit {
  resultList: Array<Object> = [];

  ngOnInit() {
    this.resultList.push({ name: "Apples" });
    this.resultList.push({ name: "Bananas" });
    this.resultList.push({ name: "Oranges" });
  }
}

