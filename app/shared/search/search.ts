export class Search {
    url = "http://186.31.113.190:8003/ConsultaListasPeps.svc/ConsultaIndividual";
  token = ""; //TODO: la rest deberia pedirlo por temas de seguridad.
  idPart: string;
  namePart: string;
  incluirAlias: string;
  paginaActual: string;
  tamanoPagina: string;
  usuarioID: string;
  consultaID: string;
  apiUrl: string;

  constructor(idPart: string, namePart: string, incluirAlias: string, paginaActual: string, tamanoPagina: string, usuarioID: string, consultaID: string) {
    this.idPart = idPart
    this.namePart = namePart;
    this.incluirAlias = incluirAlias;
    this.paginaActual = paginaActual;
    this.usuarioID = usuarioID;
    this.tamanoPagina = tamanoPagina;
    this.consultaID = consultaID;
    this.apiUrl = this.url + "/" + this.idPart + "/" + this.namePart + "/" + this.incluirAlias + "/" + this.paginaActual + "/" + this.tamanoPagina + "/" + this.usuarioID + "/" + this.consultaID;

  }

}

///ConsultaIndividual/{idPart}/{namePart}/{incluirAlias}/{paginaActual}/{tamanoPagina}/{usuarioID}/{consultaID}