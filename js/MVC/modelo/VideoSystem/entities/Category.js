"use strict";

// importar excepciones
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
} from "../exceptions/exceptions.js";

// Con este objeto podemos crear la estructura de categorías. 
class Category {
  // atributos
  #name;
  #description;

  constructor(name, description = "") {
    // comprobar contructor new
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!name) throw new EmptyValueException("name");

    // fijar
    this.#name = name;
    this.#description = description;

    // this.name = "Category";

  }

  // metodos get y set
  // name
  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value) throw new EmptyValueException("name");
    this.#name = value;
  }

  // description
  get description() {

    return this.#description;
  }

  set description(value) {
    if (value === null || value === undefined) throw new EmptyValueException("description");
    this.#description = value;
  }

  // toString()
  toString() {
    return `Name: ${this.#name}, Description: ${this.#description}`;
  }
}

export { Category }