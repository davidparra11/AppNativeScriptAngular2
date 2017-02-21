import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"; //OnInit es una clase interfaz de typescript
import { Search } from "../../shared/search/search";
import { SearchService } from "../../shared/search/search.service";
import { Router, NavigationExtras } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

import { Result } from "../../shared/result/result";

export class PepsResults3 {
    static arrayPersonas: any;
    constructor(public title: string, public src: string) { }
}

@Component({
    selector: "my-app",
    providers: [SearchService],
    templateUrl: "pages/search/search.html",
    styleUrls: ["pages/search/search-common.css", "pages/search/search.css"]
})
export class SearchComponent implements OnInit {
    searcher: Search;
    public counter: number = 1;
    idPart = "0";
    namePart = "JUAN%20MANUEL%20SANTOS";
    incluirAlias = "0";
    paginaActual = "1";
    tamanoPagina = "1";
    usuarioID = "1";
    consultaID = "0";


    
    @ViewChild("container") container: ElementRef; //angular ViewChild decorador, crea una nueva propiedad que aputa a stacklauout

    constructor(private router: Router, private searchService: SearchService, private page: Page) {
        this.searcher = new Search(this.idPart, this.namePart, this.incluirAlias,
        this.paginaActual, this.tamanoPagina, this.usuarioID, this.consultaID);
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
       /* if (!this.user.isValidCode()) {
            alert("El codigo esta entre [3,15].");
            return;
        }*/
       // alert("Ingresaste: " + this.user.codigo);
        this.counter = 0;
        //this.searchNombre();
        this.searchCodigo();
    }
    
    searchCodigo() {
        // TODO: Define
        this.searchService.search(this.searcher)
            .subscribe(
            (val) => {this.router.navigate(["/result"]);
                    console.log("resultado recuperado" + val);
                    this.searchNombre(val);
                //PepsResults3.arrayPersonas = val},
            (error) => alert("Unfortunately we could not find your search.")
            );
    }
    searchNombre(val) {
        let navigationExtras:  NavigationExtras = [val];
        this.router.navigate(["/result"], navigationExtras);
       // this.userService.search(this.user);
    }
   
}
