/**
 * Clase que al ser instanciada con los parametros de entrada de las propiedades de la clase
 * devuelve una Url seteada para hacer la consulta a la REST.
 */
export class Config {
  // Url de la REST para las consultas de Listas.
  url = "http://186.31.113.190:8003/ConsultaListasPeps.svc/ConsultaIndividual";
  static token = ""; //TODO: la REST deberia pedirlo por temas de seguridad.
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

//https://api.everlive.com/v1/GWfRtXi1Lwt4jcqK/      :8003/ConsultaListasPeps.svc/ConsultaIndividual/0/JUAN%20MANUEL%20SANTOS/0/1/1/1/0,
//https://httpbin.org/post  idPart}/{namePart}/{incluirAlias}/{paginaActual}/{tamanoPagina}/{usuarioID}/{consultaID}