"use strict";

// importar excepciones
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  AbstractClassException,
} from "../exceptions/exceptions.js";

// clase abstracta Production
class Production {
  // atributos
  #title;
  #nationality;
  #publication;
  #synopsis;
  #image;

  constructor(
    title,
    publication,
    nationality = "Sin Nacionalidad",
    synopsis = "Sin synopsis",
    image = "Sin imagen"
  ) {
    // si no se usa new, aunque no hace false por ser abstracta
    if (!new.target) throw new InvalidAccessConstructorException();
    // la clase es abstracta
    if (new.target === Production) throw new AbstractClassException("Production");
    // comprobar entrada
    if (!title) throw new EmptyValueException("title");
    // si no es una string
    if (typeof title !== "string") throw new EmptyValueException("title");
    // si no es tipo Date
    if (!publication) throw new EmptyValueException("publication");
    const date = (publication instanceof Date) ? publication : new Date(publication);
    if (Number.isNaN(date.getTime())) throw new EmptyValueException("publication");

    // asignar atributos
    this.#title = title;
    this.#nationality = nationality;
    this.#publication = date;
    this.#synopsis = synopsis;
    this.#image = image;

    this.name = "Production";

  }

  // metodos get y set

  // title
  get title() {
    return this.#title;
  }
  set title(valor) {
    if (!valor) throw new EmptyValueException("title");
    // si no es una string
    if (typeof valor !== "string") throw new EmptyValueException("title");
    this.#title = valor
  }

  // nationality
  get nationality() {
    return this.#nationality;
  }
  set nationality(valor) {
    if (!valor) throw new EmptyValueException("nationality");
    if (typeof valor !== "string") throw new EmptyValueException("nationality");

    this.#nationality = valor;
  }

  // publication
  get publication() {
    return this.#publication;
  }
  set publication(valor) {
    const date = (valor instanceof Date) ? valor : new Date(valor);
    if (Number.isNaN(date.getTime())) throw new EmptyValueException("publication");
    this.#publication = date;
  }

  // synopsis
  get synopsis() {
    return this.#synopsis;
  }
  set synopsis(valor) {
    if (!valor) throw new EmptyValueException("synopsis");
    if (typeof valor !== "string") throw new EmptyValueException("synopsis");

    this.#synopsis = valor;
  }

  // image
  get image() {
    return this.#image;
  }
  set image(valor) {
    if (!valor) throw new EmptyValueException("image");
    if (typeof valor !== "string") throw new EmptyValueException("image");
    this.#image = valor;
  }

  // toString()
  toString() {
    const nat = ", Nacionalidad: " + this.#nationality + ", " || "";
    const syn = ", Synopsis: " + this.#synopsis + "\n" || "";
    const img = "Image: " + this.#image + "\n" || "";

    return "Titulo: " + this.#title +
      nat +
      "Publication: " + this.#publication.toLocaleDateString() +
      syn +
      img
  }

  // metodo clone() para copiar el set
  // clone() {
  //   throw new AbstractClassException("Production");
  // }

}

// exportar
export { Production };