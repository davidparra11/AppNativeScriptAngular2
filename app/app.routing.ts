import { SearchComponent } from "./pages/search/search.component";
import { ResultComponent } from "./pages/result/result.component";

export const routes = [
  { path: "", component: SearchComponent },
  { path: "result", component: ResultComponent }
];

export const navigatableComponents = [
  SearchComponent,
  ResultComponent
];