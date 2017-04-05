import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { EventData } from 'data/observable';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Result } from "../../shared/result/result";
import { Data } from "../../shared/data";
import { IndividualData } from "../../shared/individualData";

var utilityModule = require("utils/utils");

import { Search } from "../../shared/search/search";
import { ResultListService } from "../../shared/result/result-list.service";
import { Searchform } from "../../shared/search/search-form";

class ItemsToShow {
    constructor(public title: string, public src: string, public relacionado_Con: string, public tipo_Lista: string) { }
}


@Component({
    selector: "result",
    providers: [ResultListService],
    templateUrl: "pages/result/result.html",
    styleUrls: ["pages/result/result-common.css", "pages/result/result.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent implements OnInit {
    isLoading = false;
    public arrayDePersonas: any;
    public individuoInstance: any;
    public Personas: ItemsToShow[] = [];
    newSearcher: Search;
    idPart = "0";
    namePart = "";
    incluirAlias = "0";
    paginaActual = "6";
    tamanoPagina = "5";
    usuarioID = "1";
    consultaID = "0";

    constructor(private router: Router, private page: Page, private route: ActivatedRoute, private data: Data, private resultService: ResultListService) {
        this.route.queryParams.subscribe(params => {
            this.namePart = params["nombre"];
        });
        var individuoInstance = data.storage.listaDeResultados;
        console.log("Consulata Id" + JSON.stringify(this.data.storage.ExtraInfo));
        this.arrayDePersonas = data.storage.listaDeResultados;

        this.Personas = [];
        this.consultaID = data.storage.ExtraInfo;
        //this.tamanoPagina = data.storage.TotalResultados;
        for (let i = 0; i < data.storage.listaDeResultados.length; i++) {
            this.Personas.push(new ItemsToShow(data.storage.listaDeResultados[i].NombreCompleto, "https://img.clipartfest.com/2e510d7c0294c0b80218c9b1aa8eed21_male-user-icon-user-clipart-icon_1000-1000.png", data.storage.listaDeResultados[i].Relacionado_Con, data.storage.listaDeResultados[i].Tipo_Lista));
        }
    }

    ngOnInit() {
        this.page.actionBarHidden = false;
    }

    public onItemTap(args) {
        this.isLoading = true;
        console.log("indicador; "+ args.index);
        this.router.navigate(["/detail"], { queryParams: { index: args.index } });
    }

    public showNew(args) {
        utilityModule.openUrl("http://www.noticiaslaft.com/?s=" + args);
    }

    public showDetails(args) {
        console.log("index: " + args.index)
        // this.router.navigate(["/detail"], { queryParams: { index: args.index } });
    }

    loadMoreItems(args) {
        // Load more items here.
        console.log("IDATOS_DATOS " + args.eventName);
        console.log("IDATOS_DATOS " + args.object);
        console.log("array de PERSonas" + JSON.stringify(this.arrayDePersonas.length));
        this.callService();
        // this.Personas.push(new Personas("pedro", "http://pngimg.com/upload/face_PNG5660.png", "test", "test"));
    }

    callService() {
        console.log("-----------------------------------------");
        var localPaginaActual = this.paginaActual;
        var intLocalPaginaActual = +localPaginaActual;
        intLocalPaginaActual += 1;
        var strLocalPaginaActual = String(intLocalPaginaActual);
        this.paginaActual = strLocalPaginaActual;

        this.newSearcher = new Search(this.idPart, this.namePart, this.incluirAlias,
            strLocalPaginaActual, this.tamanoPagina, this.usuarioID, this.consultaID);

        this.resultService.load(this.newSearcher, this.arrayDePersonas)
            .subscribe(
            (val) => {
                //this.arrayDePersonas.push();

                console.log("val " + val);
                console.log("length " + val.length);
                console.log("Nombre Completo [0] " + val[0].NombreCompleto);
                //  console.log("NUEVO ARRAY DE LA CLASE INSTANCIADA " + this.individuoInstance[0]);

                for (let i = 0; i < val.length; i++) {
                    console.log("val[i]" + val[i]);

                    this.Personas.push(new ItemsToShow(val[i].NombreCompleto, "https://img.clipartfest.com/2e510d7c0294c0b80218c9b1aa8eed21_male-user-icon-user-clipart-icon_1000-1000.png", val[i].Relacionado_Con, val[i].Tipo_Lista));
                    // this.Personas.push(new Personas("test", "https://img.clipartfest.com/2e510d7c0294c0b80218c9b1aa8eed21_male-user-icon-user-clipart-icon_1000-1000.png", "test", "test"));
                }
            },
            (error) => alert("Desfarptunamedente no se ha encontrado tu búsqueda")
            );

    }

}
