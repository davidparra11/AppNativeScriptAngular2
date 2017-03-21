import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"; //OnInit es una clase interfaz de typescript
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router,ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { prompt } from "ui/dialogs";
import { TextField } from "ui/text-field";

import { Data } from "../../shared/data";

@Component({
    selector: "detail",
    providers: [UserService],
    templateUrl: "pages/detail/detail.html",
    styleUrls: ["pages/detail/detail-common.css", "pages/detail/detail.css"]
})
export class DetailComponent implements OnInit {
    user: User;
    public counter: number = 1;
    public individualDetail: any;
    messageButton: string = "Inicio de Sesion";
    isAuthenticating = false; //prevenir el multitoque
    individuoIndex: string;
    nacionalidad = "colombiana";
    nombreIndividuo = "";
    tipoPersona = "";
    relacionadoCon = "";

    @ViewChild("container") container: ElementRef; //angular ViewChild decorador, crea una nueva propiedad que aputa a stacklauout
    @ViewChild("initialContainer") initialContainer: ElementRef;
    @ViewChild("mainContainer") mainContainer: ElementRef;
    @ViewChild("logoContainer") logoContainer: ElementRef;
    @ViewChild("formControls") formControls: ElementRef;
    @ViewChild("password") password: ElementRef;

    constructor(private router: Router, private userService: UserService, private page: Page, private route: ActivatedRoute, private data: Data) {
        this.user = new User();
        this.route.queryParams.subscribe(params => {
            this.individuoIndex = params["index"];
        });
        this.individualDetail = data.storage;
        this.nacionalidad = this.individuoIndex;
    }
    ngOnInit() {
        this.page.actionBarHidden = false;
        // this.page.backgroundImage = "res://background"; 
        
        this.nacionalidad = this.individuoIndex;
        this.nombreIndividuo = this.individualDetail.listaDeResultados[this.individuoIndex].NombreCompleto;
        this.tipoPersona = this.individualDetail.listaDeResultados[this.individuoIndex].Tipo_Persona;
        this.relacionadoCon = this.individualDetail.listaDeResultados[this.individuoIndex].Relacionado_Con;
        console.log("origne lista" + this.tipoPersona);
              
    }

    submit() {
        /*if (!this.user.isValidCode()) {
             alert("El codigo esta entre [3,10].");
             return;  listaDeResultados[i].NombreCompleto
         }
         if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }
    this.login();
  }

  login() {
    if (getConnectionType() === connectionType.none) {
      alert("Groceries requires an internet connection to log in.");
      return;
    }
         */
        alert("Ingresaste: " + this.user.codigo);
        //this.loginUser();
    }
  
  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000
    });
  }

  showMainContent() {
    let initialContainer = <View>this.initialContainer.nativeElement;
    let mainContainer = <View>this.mainContainer.nativeElement;
    let logoContainer = <View>this.logoContainer.nativeElement;
    let formControls = <View>this.formControls.nativeElement;
    let animations = [];

    // Fade out the initial content over one half second
    initialContainer.animate({
      opacity: 0,
      duration: 500
    }).then(function() {
      // After the animation completes, hide the initial container and
      // show the main container and logo. The main container and logo will
      // not immediately appear because their opacity is set to 0 in CSS.
      initialContainer.style.visibility = "collapse";
      mainContainer.style.visibility = "visible";
      logoContainer.style.visibility = "visible";

      // Fade in the main container and logo over one half second.
      animations.push({ target: mainContainer, opacity: 1, duration: 500 });
      animations.push({ target: logoContainer, opacity: 1, duration: 500 });

      // Slide up the form controls and sign up container.
      animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });

      // Kick off the animation queue
      new Animation(animations, false).play();
    });
  }
}