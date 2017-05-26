/** Clase que modela el formulario de validación, ademas implementa un metodo para la 
 * validacion del código (mayor a 3 menor que 10).
 */
var validator = require("validator");

export class Searchform {
  codigo: string;
  nombre: string;
  
  isValidCode() {
    return validator.isLength(this.codigo, {min:3, max:10});
  }
}