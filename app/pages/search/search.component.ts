import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"; //OnInit es una clase interfaz de typescript
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "pages/search/search.html",
    styleUrls: ["pages/search/search-common.css", "pages/search/search.css"]
})
export class SearchComponent implements OnInit {
    user: User;
    public counter: number = 1;

    @ViewChild("container") container: ElementRef; //angular ViewChild decorador, crea una nueva propiedad que aputa a stacklauout

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
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
        alert("Ingresaste: " + this.user.codigo);
        this.counter = 0;
        this.searchNombre();
    }
    searchCodigo() {
        // TODO: Define
        this.userService.search(this.user)
            .subscribe(
            () => this.router.navigate(["/result"]),
            (error) => alert("Unfortunately we could not find your account.")
            );
    }
    searchNombre() {
        this.router.navigate(["/result"]);
        this.userService.search(this.user);
    }
   
}
