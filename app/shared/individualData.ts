import { Injectable } from '@angular/core';
 
@Injectable()

/**
 * Es una clase del core de Angular que se utiliza para pasar información entre componentes una vez que 
 * se inyecta en el componenete requerido.
 */
export class IndividualData {
 
    public storage: any;
 
    public constructor() { }
 
}