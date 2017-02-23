import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"; //OnInit es una clase interfaz de typescript
import { Search } from "../../shared/search/search";
import { SearchService } from "../../shared/search/search.service";
import { Router, NavigationExtras } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

import { Result } from "../../shared/result/result";
import { Data } from "../../shared/data";
import { Searchform } from "../../shared/search/search-form";


@Component({
    selector: "my-app",
    providers: [SearchService],
    templateUrl: "pages/search/search.html",
    styleUrls: ["pages/search/search-common.css", "pages/search/search.css"]
})

export class SearchComponent implements OnInit {
    searcher: Search;
    isLoading = false;
    searchForm: Searchform;
    public counter: number = 1;
    idPart = "0";
    namePart = "JUAN%20MANUEL%20SANTOS";
    incluirAlias = "0";
    paginaActual = "1";
    tamanoPagina = "1";
    usuarioID = "1";
    consultaID = "0";

    @ViewChild("container") container: ElementRef; //angular ViewChild decorador, crea una nueva propiedad que aputa a stacklauout

    constructor(private router: Router, private searchService: SearchService, private page: Page, private data: Data) {
        this.searchForm = new Searchform();
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://sidif_logo";
    }

    public get message(): string {
        if (this.counter == 1) {
            return "Realiza la búsqueda por Identificación o por Nombres.";
        } else {
            return "No se encontró coincidencia!";
        }
    }
    submit() {
        this.isLoading = true;
        var re = / /gi;
        var newnamePart = this.searchForm.nombre.replace(re, "%20");
        console.log(newnamePart);
        /* if (!this.user.isValidCode()) {
             alert("El codigo esta entre [3,15].");
             return;
         }*/
        this.searcher = new Search(this.idPart, newnamePart, this.incluirAlias,
            this.paginaActual, this.tamanoPagina, this.usuarioID, this.consultaID);
        // alert("Ingresaste: " + this.user.codigo);
        this.counter = 0;
        //this.searchNombre();
        this.searchCodigo();
    }

    searchCodigo() {
        // TODO: Define
        this.searchService.search(this.searcher)
            .subscribe(
            (val) => {
                this.router.navigate(["/result"]);
                console.log("resultado recuperado" + val);
                this.data.storage = val;
                this.isLoading = false;
                this.searchNombre();
            },
            //PepsResults3.arrayPersonas = val},
            (error) => alert("Unfortunately we could not find your search.")
            );
    }
    searchNombre() {
        this.router.navigate(["/result"]);
        // this.userService.search(this.user);
    }

}
