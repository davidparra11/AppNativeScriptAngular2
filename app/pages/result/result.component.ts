import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Page } from "ui/page";
import {ActivatedRoute} from "@angular/router";
import { Result } from "../../shared/result/result";
import { PepsResults3 } from "../search/search.component";
import { Data } from "../../shared/data";

var utilityModule = require("utils/utils");

export class PepsResults {
    static arrayPersonas: Array<Result>;
    constructor(public title: string, public src: string) { }
}

class Country {
    constructor(public title: string, public src: string) { }
}

let europianPersonas = [["Juan Santos","http://www.las2orillas.co/wp-content/uploads/2014/05/JuanManuel-Santos.png"],
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
    public arrayDePersonas : any;
    public test : any;
    public Personas: Array<Country>;
   // public pepsResultsArray = PepsResults3.arrayPersonas;
    
    constructor(private page: Page, private route: ActivatedRoute, private data: Data) {
       // this.test.push({"NombreCompleto": "david"});
       this.test = data.storage;
                console.log("DATA" + JSON.stringify(this.data.storage));
                this.arrayDePersonas  = data.storage;

                 this.Personas = [];

        for (let i = 0; i < europianPersonas.length; i++) {
            this.Personas.push(new Country(europianPersonas[i][0], europianPersonas[i][1]));
        }
                
       /* this.route.queryParams.subscribe(params => {

            for (let i = 0; i < params.length; i++) {
            this.pepsResultsArray.push(new Result(europianPersonas[i][0], europianCountries[i][1]));
        }
           
        });
             
        for (let i = 0; i < this.data.storage.length; i++) {
            this.pepsResultsArray.push(new Result(europianCountries[i][0], europianCountries[i][1]));
        }
*/
        
        
       

        
    }

    

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    public showNew(args) {
        utilityModule.openUrl("http://www.noticiaslaft.com/?s=" + args);
    }
}