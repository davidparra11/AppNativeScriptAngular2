import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"; //OnInit es una clase interfaz de typescript
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { prompt } from "ui/dialogs";
import { TextField } from "ui/text-field";

@Component({
    selector: "",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
/** Clase login que se encarga de la adminsitración del componente para el logueo del usuario. */
export class LoginComponent implements OnInit {
    user: User;
    public counter: number = 1;
    messageButton: string = "Inicio de Sesion";
    isAuthenticating = false; //prevenir el multitoque

    @ViewChild("container") container: ElementRef; //angular ViewChild decorador, crea una nueva propiedad que aputa a stacklauout
    @ViewChild("initialContainer") initialContainer: ElementRef;
    @ViewChild("mainContainer") mainContainer: ElementRef;
    @ViewChild("logoContainer") logoContainer: ElementRef;
    @ViewChild("formControls") formControls: ElementRef;
    @ViewChild("password") password: ElementRef;

    /**Contructor de la clase */
    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
    }
    /** Método que se carga antes de iniciar la vista del componente */
    ngOnInit() {
        this.page.actionBarHidden = true;
        // this.page.backgroundImage = "res://background";        
    }
    /** Funcion llamada desde la template del componente cada vez que intentamos iniciar sesión */
    submit() {
        alert("Ingresaste: " + this.user.codigo);
        this.loginUser();
    }
    /** Función que hace la consulta al SP y validar las credenciales de acceso. */
    loginUser() {
        // TODO: Cuando este el SP, definir las reglas de acceso.
        this.router.navigate(["/search"])
    }
    focusPassword() {
    this.password.nativeElement.focus();
  }
  /** Funcion para animar la imagen de Background de esta vista */
  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000
    });
  }
/** Funcion que muestra el formulario de login,  imagen empresarial y otros despues de medio segundo*/
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
