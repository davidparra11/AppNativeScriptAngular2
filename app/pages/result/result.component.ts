import { Component, ElementRef, ChangeDetectionStrategy, OnInit } from "@angular/core";
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
/**
 * Estos seran los campos a mostrar para cada fila del ListView. 
 */
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
/** 
 * Clase Result que administra el componente de la vista que despliega una
 * lista de resultados. 
 */
export class ResultComponent implements OnInit {
    isLoading = true; //Para detener o activar un Activity indicator View
    public arrayDePersonas: any;
    public individuoInstance: any;
    public Personas: ItemsToShow[] = [];
    newSearcher: Search; //otro objeto para traer una nueva Url de búsqueda del WebService
    idPart = "0";
    namePart = "";
    incluirAlias = "0";
    paginaActual = "6";
    tamanoPagina = "5";
    usuarioID = "1";
    consultaID = "0";
    longitudArray:number;    

    constructor(private router: Router, private page: Page, private route: ActivatedRoute, private data: Data, private resultService: ResultListService) {
        this.route.queryParams.subscribe(params => {
            this.namePart = params["nombre"];
        });

        var individuoInstance = data.storage.listaDeResultados;
        this.arrayDePersonas = data.storage.listaDeResultados;
        this.longitudArray = data.storage.listaDeResultados.length;

        this.Personas = [];
        this.consultaID = data.storage.ExtraInfo;
        console.log("longitud del array para mirar porq se repte: " + data.storage.listaDeResultados.length);
        for (let i = 0; i < data.storage.listaDeResultados.length; i++) {
            this.Personas.push(new ItemsToShow(data.storage.listaDeResultados[i].NombreCompleto, "https://oiganoticias.files.wordpress.com/2016/04/santos-7.jpg?w=723", data.storage.listaDeResultados[i].Relacionado_Con, data.storage.listaDeResultados[i].Tipo_Lista));
        }
    }
    /**
     * Se utiliza por que requiere de implementaciones mas pesadas que el 
     * constructor puede realizar. 
     * */
    ngOnInit() {
        this.page.actionBarHidden = false;
    }
    /**
     * Evento de la vista para redirigir al Detail View o vista de Detalle.
     * @param {any} args - argumentos nativos de la clase.
     */
    public onItemTap(args) {
        this.isLoading = true;
        console.log("indicador; "+ args.index);
        this.router.navigate(["/detail"], { queryParams: { index: args.index } });
    }
    /**
     * Evento de la vista para abrir una pàgina web con noticias de la persona seleccionada.
     * @param {any} args - argumentos nativos de la clase Padre.
     */
    public showNew(args) {
        utilityModule.openUrl("http://www.noticiaslaft.com/?s=" + args);
    }
    /**
     * Método heredado del template para hacer un triger de una función cuando se llega al final de
     * los resultados y se hace un scroll a la página para recuperar mas datos.
     * @param args {any}
     */
    loadMoreItems(args) {
        // Load more items here.
        console.log("array de PERSonas" + JSON.stringify(this.arrayDePersonas.length));
        if (this.longitudArray > 4){
            this.callService();
        }
        this.callService();
        // this.Personas.push(new Personas("pedro", "http://pngimg.com/upload/face_PNG5660.png", "test", "test"));
    }
    /**
     * Función para llamar el servicio de cargar nuevos resultados a al array de la vista actual. 
     */
    callService() {
        console.log("-----------------------------------------");
        // Bloque definir el string de la página actual incrementado en uno (esto para hacer un mejor approach en la consulta).
        var localPaginaActual = this.paginaActual;
        var intLocalPaginaActual = +localPaginaActual;
        intLocalPaginaActual += 1;
        var strLocalPaginaActual = String(intLocalPaginaActual);
        this.paginaActual = strLocalPaginaActual;
        console.log("PAGIN ACTUAL " + strLocalPaginaActual);
        // Fin del Bloque.

        // Se instancia una clae Search para mandarlo al servicio resultService, el objeto final construirá la url de consulta.
        this.newSearcher = new Search(this.idPart, this.namePart, this.incluirAlias,
            strLocalPaginaActual, this.tamanoPagina, this.usuarioID, this.consultaID);

        this.resultService.load(this.newSearcher, this.arrayDePersonas)
            .subscribe(
            (val) => {
                for (let i = 0; i < val.length; i++) {
                    console.log("val[i]" + val[i]);
                    this.Personas.push(new ItemsToShow(val[i].NombreCompleto, "https://img.clipartfest.com/2e510d7c0294c0b80218c9b1aa8eed21_male-user-icon-user-clipart-icon_1000-1000.png", val[i].Relacionado_Con, val[i].Tipo_Lista));                    
                }
            },
            (error) => alert("Desfarptunamedente no se ha encontrado tu búsqueda")
            );

    }

}
