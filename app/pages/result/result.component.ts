import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { EventData } from 'data/observable';
import { ActivatedRoute } from "@angular/router";
import { Result } from "../../shared/result/result";
import { Data } from "../../shared/data";

var utilityModule = require("utils/utils");

import { Search } from "../../shared/search/search";
import { ResultListService } from "../../shared/result/result-list.service";
import { Searchform } from "../../shared/search/search-form";

class Personas {
    constructor(public title: string, public src: string, public relacionado_Con: string, public tipo_Lista: string) { }
}

let europianPersonas = [["Juan Santos", "http://www.las2orillas.co/wp-content/uploads/2014/05/JuanManuel-Santos.png"],
["Barack Obama", "http://pngimg.com/upload/face_PNG5660.png"],
["OTro", "http://pngimg.com/upload/face_PNG5660.png"],
["OTro", "http://pngimg.com/upload/face_PNG5660.png"]
];

@Component({
    selector: "result",
    providers: [ResultListService],
    templateUrl: "pages/result/result.html",
    styleUrls: ["pages/result/result-common.css", "pages/result/result.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent implements OnInit {
    public arrayDePersonas: any;
    public test: any;
    public Personass: Array<Personas>;
    public Personas: Personas[] = [];
    public Personas2: Personas[] = [];
    newSearcher: Search;

    idPart = "0";
    namePart = "";
    incluirAlias = "0";
    paginaActual = "2";
    tamanoPagina = "5";
    usuarioID = "1";
    consultaID = "0";


    constructor(private page: Page, private route: ActivatedRoute, private data: Data, private resultService: ResultListService) {
        this.route.queryParams.subscribe(params => {
            this.namePart = params["nombre"];
        });
        
        this.test = data.storage;
        console.log("DATA Clase" + JSON.stringify(this.data.storage));
        this.arrayDePersonas = data.storage;

        this.Personas = [];
        this.consultaID = data.storage.ExtraInfo;

        for (let i = 0; i < data.storage.listaDeResultados.length; i++) {
            this.Personas.push(new Personas(data.storage.listaDeResultados[i].NombreCompleto, "http://pngimg.com/upload/face_PNG5660.png", data.storage.listaDeResultados[i].Relacionado_Con, data.storage.listaDeResultados[i].Tipo_Lista));
        }

    }
    ngOnInit() {
        this.page.actionBarHidden = false;
    }

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
        console.log("Item Tapped at cell index: " + args.view);
    }

     public showNew(args) {
         utilityModule.openUrl("http://www.noticiaslaft.com/?s=" + args);
     }
    /* public onLoadMoreItems(args){
         console.log("IDATOS_DATOS " + args.eventName);
         console.log("IDATOS_DATOS " + args.object);
         this.Personas = [];
 
       
             this.Personas.push(new Personas("pedro", "http://pngimg.com/upload/face_PNG5660.png", "data.storage[i].Relacionado_Con", "data.storage[i].Tipo_Lista"));
         
     }*/

    loadMoreItems(args) {
        // Load more items here.
       // console.log("hoa mundo");
       // console.log("IDATOS_DATOS " + args.eventName);
       // console.log("IDATOS_DATOS " + args.object);


        console.log("IDATOS_DATOS " + this.namePart);
        this.callService();


       // this.Personas.push(new Personas("pedro", "http://pngimg.com/upload/face_PNG5660.png", "data.storage[i].Relacionado_Con", "data.storage[i].Tipo_Lista"));

    }

    callService(){

        console.log("-----------------------------------------");
       
            this.Personas2 = [];
         this.newSearcher = new Search(this.idPart, this.namePart, this.incluirAlias,
            this.paginaActual, this.tamanoPagina, this.usuarioID, this.consultaID);

         this.resultService.load(this.newSearcher)
            .subscribe(
            (val) => {

                console.log("val " + val);
        console.log("length " + val.length);
        console.log("Nombre Completo [0] " + val[0].NombreCompleto);

                 for (let i = 0; i < val.length; i++) {
                     console.log("val[i]" + val[i]);
            this.Personas.push(new Personas(val[i].NombreCompleto, "http://pngimg.com/upload/face_PNG5660.png", val[i].Relacionado_Con, val[i].Tipo_Lista));
        }
               
                console.log("Resultado recuperado" + val.NombreCompleto);
                 //this.Personas.push(new Personas( val.listaDeResultados.NombreCompleto, "http://pngimg.com/upload/face_PNG5660.png", "data.storage[i].Relacionado_Con", "data.storage[i].Tipo_Lista"));
                
                
                //this.searchNombre();
            },
            //PepsResults3.arrayPersonas = val},
            (error) => alert("Desfarptunamedente no se ha encontrado tu búsqueda")
            );

    }

}