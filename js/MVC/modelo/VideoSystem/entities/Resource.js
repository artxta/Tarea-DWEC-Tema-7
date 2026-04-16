"use strict";

// importar excepciones
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
} from "../exceptions/exceptions.js";

// clase Resource
class Resource {
  // atributos privados
  #duration;
  #link;

  constructor(duration, link) {
    // comprobar new
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!duration) throw new EmptyValueException("duration");
    // solo aceptar Number
    if (typeof duration !== "number" || Number.isNaN(duration))
      throw new EmptyValueException("duration");

    if (!link) throw new EmptyValueException("link");

    // asignar valor
    this.#duration = duration;
    this.#link = link;

    this.name = "Resource";
  }

  // metodos set y get
  // duration
  get duration() {
    return this.#duration;
  }
  set duration(valor) {
    if (!valor) throw new EmptyValueException("duration");
    if (typeof valor !== "number" || Number.isNaN(valor)) throw new EmptyValueException("duration");
    this.#duration = valor;
  }

  // name 
  get link() {
    return this.#link
  }
  set link(valor) {
    if (!valor) throw new EmptyValueException("link");
    this.#link = valor;
  }

  // toString()
  toString() {
    return `Duration: ${this.#duration}, Link: ${this.#link}\n`;
  }

}

export { Resource } 