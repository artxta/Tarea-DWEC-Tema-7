"use strict";
// importar excepciones
import {
  EmptyValueException,
  InvalidAccessConstructorException,

} from "../exceptions/exceptions.js";

// clase Coordinate
class Coordinate {
  // atributos  privados
  #latitude;
  #longitude;

  constructor(latitude, longitude) {
    // usar new en el contructor
    if (!new.target) throw new InvalidAccessConstructorException();
    // comprobar entrada parametros
    if ((typeof latitude !== "number")) throw new EmptyValueException("latitude");
    if ((typeof longitude !== "number")) throw new EmptyValueException("longitude");

    // asignar atributos
    this.#latitude = latitude;
    this.#longitude = longitude;

  }

  // metodos getter y setter
  // latitude
  get latitude() {
    return this.#latitude;
  }
  set latitude(valor) {
    // comprobar entrada
    if ((typeof valor !== "number")) throw new EmptyValueException("latitude");
    this.#latitude = valor;
  }

  // longitude
  get longitude() {
    return this.#longitude;
  }
  set longitude(valor) {
    // comprobar entrada
    if ((typeof valor !== "number")) throw new EmptyValueException("longitude");
    this.#longitude = valor
  }

  // metodo toString()
  toString() {
    return `Latitude: ${this.#latitude}, Longitud: ${this.#longitude}\n`;
  }

}

export { Coordinate }