/** Clase para implementar el modulo "Validator" */
var validator = require("validator");

export class Searchform {
  codigo: string;
  nombre: string;
  
  isValidCode() {
    return validator.isLength(this.codigo, {min:3, max:10});
  }
}