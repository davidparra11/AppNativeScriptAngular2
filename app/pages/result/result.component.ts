import { Component, ChangeDetectionStrategy } from "@angular/core";

var utilityModule = require("utils/utils");

class Country {
    constructor(public title: string, public src: string) { }
}

let europianCountries = [["Juan Santos","http://pngimg.com/upload/face_PNG5660.png"],
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
    public countries: Array<Country>;

    constructor() {
        this.countries = [];

        for (let i = 0; i < europianCountries.length; i++) {
            this.countries.push(new Country(europianCountries[i][0], europianCountries[i][1]));
        }
    }

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    public showNew(args) {
        utilityModule.openUrl("http://www.noticiaslaft.com/?s=" + args);
    }
}