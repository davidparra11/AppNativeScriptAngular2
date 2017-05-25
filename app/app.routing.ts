import { SearchComponent } from "./pages/search/search.component";
import { ResultComponent } from "./pages/result/result.component";
import { LoginComponent } from "./pages/login/login.component";
import { DetailComponent } from "./pages/detail/detail.component";

export const routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "", component: LoginComponent },
  { path: "search", component: SearchComponent },
  { path: "result", component: ResultComponent },
  { path: "detail", component: DetailComponent }
];

export const navigatableComponents = [
  LoginComponent,
  SearchComponent,
  ResultComponent,
  DetailComponent
  ];