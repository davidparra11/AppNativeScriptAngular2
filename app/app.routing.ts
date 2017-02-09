import { SearchComponent } from "./pages/search/search.component";
import { ResultComponent } from "./pages/result/result.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes = [
  { path: "", redirectTo: "/result", pathMatch: "full" },
  { path: "", component: LoginComponent },
  { path: "search", component: SearchComponent },
  { path: "result", component: ResultComponent }
];

export const navigatableComponents = [
  ResultComponent,
  LoginComponent,
  SearchComponent  
];