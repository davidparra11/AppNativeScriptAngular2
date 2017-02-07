var validator = require("validator");

export class User {
  codigo: string;
  nombre: string;
  password: string;
  
  isValidCode() {
    return validator.isLength(this.codigo, {min:3, max:10});
  }
}