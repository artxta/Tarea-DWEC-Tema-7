"use strict";

// importar excepciones
import {
  InvalidAccessConstructorException,
  WrongClass,
  EmptyValueException,
} from "../exceptions/exceptions.js";

// importar clase Production
import { Production } from "./Production.js";
import { Resource } from "./Resource.js";
import { Coordinate } from "./Coordinate.js";

// clase que hereda de Production
class Movie extends Production {
  // atributos
  #resource;
  #locations;

  constructor(title, nationality, publication, synopsis, image,
    resource = new Resource(0, ""), locations = []) { // Recurso con el contenido de la película.
    super(title, nationality, publication, synopsis, image);

    // se contruye con new
    if (!new.target) throw new InvalidAccessConstructorException();

    this.#resource = resource;
    this.#locations = locations;

    this.name = "Movie";

  }

  // metodos get 7 set

  // title
  get title() {
    return super.title;
  }
  set title(value) {
    super.title = value;
  }

  // nationality
  get nationality() {
    return super.nationality;
  }
  set nationality(value) {
    super.nationality = value;
  }

  // publication
  get publication() {
    return super.publication;
  }
  set publication(value) {
    super.publication = value;
  }

  // synopsis
  get synopsis() {
    return super.synopsis;
  }
  set synopsis(value) {
    super.synopsis = value;
  }

  // image 
  get image() {
    return super.image;
  }
  set image(value) {
    super.image = value;
  }

  // resource
  get resource() {
    return this.#resource;
  }
  set resource(value) {
    if (!(value instanceof Resource)) throw new WrongClass("Resource", value.name || "");
    if (!value) throw new EmptyValueException("resource");

    this.#resource = value;
  }

  // locations
  get locations() {
    return this.#locations;
  }
  set locations(value) {
    if (!value) throw new EmptyValueException("array of locations");
    if (!Array.isArray(value)) throw new EmptyValueException("array of locations");
    this.#locations = value;
  }

  // toString()
  toString() {
    let salida = "";
    salida += super.toString();
    salida += "Recurso: "
    salida += this.#resource.toString();

    salida += "Locations: \n";
    // recorrer array locations
    for (let l of this.#locations) {
      salida += l.toString();
      salida += "\n ";
    }

    return salida;
  }

}

export { Movie }
