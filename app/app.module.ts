import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms"; //makes the [(ngModel)] syntax work with NativeScript’s UI components.
import { NativeScriptHttpModule } from "nativescript-angular/http";  //is a NativeScript wrapper of Angular’s HttpModule, 
//a module that declares all of Angular’s HTTP-based services—including the Http service that UserService uses.
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Data } from "./shared/data";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

@NgModule({
    declarations: [AppComponent,
        ...navigatableComponents],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [Data]
})
export class AppModule { }


