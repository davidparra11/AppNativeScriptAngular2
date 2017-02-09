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


    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
        // this.page.backgroundImage = "res://background";        
    }

    submit() {
        /*if (!this.user.isValidCode()) {
             alert("El codigo esta entre [3,10].");
             return;
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
        this.loginUser();
    }
    loginUser() {
        // TODO: Define
        this.router.navigate(["/search"])
    }
    focusPassword() {
    this.password.nativeElement.focus();
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
/*
 loginUser() {
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
    toggleDisplay() {
        this.byCode = !this.byCode;
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.byCode ? new Color("white") : new Color("#30bcff"),
            duration: 200
        });


    }

    this.userService.login(this.user)
      .subscribe(
        () => {
          this.isAuthenticating = false;
          this.router.navigate(["/"]);
        },
        (error) => {
          alert("Unfortunately we could not find your account.");
          this.isAuthenticating = false;
        }
      );
*/