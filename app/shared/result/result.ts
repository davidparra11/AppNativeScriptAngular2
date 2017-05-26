/** Esto crea un modelo simple de un resultado  que se puede usar en la app */
export class Result {
  constructor(public Fuente: string,
    public Id: string,
    public LlaveImagen: string,
    public NombreCompleto: string,
    public Origen_Lista: string,
    public Tipo_Lista: string,
    public Tipo_Persona: string,
    public Relacionado_Con: string,
    public Rol_o_Descripcion1: string
  ) { } 
}


