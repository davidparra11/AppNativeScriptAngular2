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
/** Clase Search que administrea el componente de la vista búsqueda. */
export class SearchComponent implements OnInit {
    searcher: Search;  //Un objeto que devuelve un url construida a razon de cierts parámetros
    isLoading = false; //Para detener o activar un Activity indicator View
    isAuthenticating = false; //Para bloquear campos es entrada
    public searchForm: Searchform;
    public counter: number = 1;
    idPart = "0";
    namePart = "";
    incluirAlias = "0";
    paginaActual = "1";
    tamanoPagina = "5";
    usuarioID = "1";
    consultaID = "0";

    @ViewChild("container") container: ElementRef; //angular ViewChild decorador, crea una nueva propiedad que aputa a stacklauout

    constructor(private router: Router, private searchService: SearchService, private page: Page, private data: Data) {
        this.searchForm = new Searchform();
    }
    /** Esta funcion es invocada antes de que las propiedades vinculadas a datos de la directiva se hayan comprobado por primera vez. */
    ngOnInit() {
        this.page.actionBarHidden = false;
    }
    /** Esta función sirve para mostar un mensaje al usuario . */
    public get message(): string {
        if (this.counter == 1) {
            return "Realiza la búsqueda por Identificación o por Nombres.";
        } else {
            return "Buscando coincidencias!";
        }
    }

    /** La función se dispara por un evento del layout, cuando se quiere hacer la busqueda del 
     * texto ingresado. */
    submit() {
        this.isLoading = true;
        this.isAuthenticating = true;
        var re = / /gi; //expresion regular
        var newnamePart = this.searchForm.nombre.replace(re, "%20");
        this.searcher = new Search(this.idPart, newnamePart, this.incluirAlias,
            this.paginaActual, this.tamanoPagina, this.usuarioID, this.consultaID);
        this.counter = 0;
        this.searchCodigo(newnamePart);
    }
    /** La función llama al servicio searchService para traer los datos del nombre consultado. */
    searchCodigo(newnamePart) {
        // TODO: Define val variable.
        this.searchService.search(this.searcher)
            .subscribe(
            (val) => {
                this.isLoading = false;
                this.isAuthenticating = false;
                console.log("Resultado recuperado" + val.listaDeResultados);
                this.counter = 1;
                this.data.storage = val;
                this.router.navigate(["/result"], { queryParams: { nombre: newnamePart } });

            },
            (error) => {
                alert("Desafortunadamente no se ha encontrado tu búsqueda")
                this.isLoading = false;
                this.isAuthenticating = false;
            }
            );
    }
}
