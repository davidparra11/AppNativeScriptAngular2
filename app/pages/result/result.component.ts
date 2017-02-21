import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Page } from "ui/page";
import {ActivatedRoute} from "@angular/router";
import { Result } from "../../shared/result/result";
import { PepsResults3 } from "../search/search.component";

var utilityModule = require("utils/utils");

export class PepsResults {
    static arrayPersonas: Array<Result>;
    constructor(public title: string, public src: string) { }
}

let europianCountries = [["Juan Santos","http://www.las2orillas.co/wp-content/uploads/2014/05/JuanManuel-Santos.png"],
["Barack Obama","http://pngimg.com/upload/face_PNG5660.png"],
["OTro","http://pngimg.com/upload/face_PNG5660.png"],
["OTro","http://pngimg.com/upload/face_PNG5660.png"]
];

@Component({
    selector: "result",
    templateUrl: "pages/result/result.html",
    styleUrls: ["pages/result/result-common.css", "pages/result/result.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent {
    public arrayDePersonas = [];
    public pepsResultsArray = PepsResults3.arrayPersonas;
    
    constructor(private page: Page, private route: ActivatedRoute) {

        this.route.queryParams.subscribe(params => {

            for (let i = 0; i < params.length; i++) {
            this.pepsResultsArray.push(new Result(europianCountries[i][0], europianCountries[i][1]));
        }
           
        });
            
        /*for (let i = 0; i < this.pepsResultsArray.length; i++) {
            this.pepsResultsArray.push(new Result(europianCountries[i][0], europianCountries[i][1]));
        }

        
        
        */

        
    }

    ngOnInit() {
    this.page.actionBarHidden = true;
    console.log("hola mundoo" +  PepsResults3.arrayPersonas);
  }

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    public showNew(args) {
        utilityModule.openUrl("http://www.noticiaslaft.com/?s=" + args);
    }
}