"use strict";

// importar excepciones
import {
  InvalidAccessConstructorException,
  EmptyValueException,

} from "../exceptions/exceptions.js";

import { Production } from "./Production.js";

// clase Serie
class Serie extends Production {
  // atributos privados
  #resources;
  #locations;
  #seasons;

  constructor(title, nationality, publication, synopsis, image, resources = [],
    locations = [], seasons = 0
  ) {
    // si no se usa new
    if (!new.target) throw new InvalidAccessConstructorException();

    super(title, nationality, publication, synopsis, image);
    // validar parametros
    this.#resources = resources;
    this.#locations = locations;
    this.#seasons = seasons;

    this.name = "Serie";
  }

  // metodos get y set
  // title
  get title() {
    return super.title;
  }
  set title(valor) {
    super.title = valor;
  }

  // natinality
  get nationality() {
    return super.nationality;
  }
  set nationality(valor) {
    super.nationality = valor;
  }

  // publication
  get nationality() {
    return super.nationality;
  }
  set nationality(valor) {
    super.nationality = valor;
  }

  // synopsis
  get synopsis() {
    return super.synopsis;
  }
  set synopsis(valor) {
    super.synopsis = valor;
  }

  // image
  get image() {
    return super.image;
  }
  set image(valor) {
    super.image = valor;
  }

  // resources
  get resources() {
    return this.#resources;
  }
  set resources(valor) {
    this.#resources = valor
  }

  // locations
  get locations() {
    return this.#locations;
  }
  set locations(valor) {
    this.#locations = valor;
  }

  // seasons
  get seasons() {
    return this.#seasons;
  }
  set seasons(valor) {
    this.#seasons = valor;
  }

  // toString()
  toString() {
    let salida = "";
    salida += super.toString();
    salida += "\n";

    // mostrar resource
    salida += "Resources: \n";
    for (let r of this.#resources) {
      salida += `${r.toString()}`;
    }
    // mostrar Coordinate
    salida += "\nLocations: \n";
    for (let l of this.#locations) {
      salida += `${l.toString()}`;
    }

    salida += "Temporadas: ";
    salida += this.#seasons;

    return salida;

  }


}

export { Serie };