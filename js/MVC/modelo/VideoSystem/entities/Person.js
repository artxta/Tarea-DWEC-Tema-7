"use strict";

import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
} from "../exceptions/exceptions.js";

// Objeto para identificar los datos de una persona
class Person {
  // campos privados
  #name;
  #lastname1;
  #lastname2;
  #born;
  #picture;

  constructor(name, lastname1, born, lastname2 = "", picture = "") {
    // comprobar si se llama con new
    if (!new.target) throw new InvalidAccessConstructorException();

    // validar parametros
    if (!name) throw new EmptyValueException("name");
    if (!lastname1) throw new EmptyValueException("lastname1");
    // si born es una fecha o una string
    const date = born instanceof Date ? born : new Date(born);
    if (isNaN(date.getTime())) throw new EmptyValueException("born");

    // definir los atributos
    this.#name = name;
    this.#lastname1 = lastname1;
    this.#lastname2 = lastname2;
    this.#born = date;
    this.#picture = picture;

    // this.name = "Person";

    // name
    Object.defineProperty(this, 'name', {
      enumerable: true,
      get() {
        return this.#name;
      },
      set(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
      }
    });

    // lastname1
    Object.defineProperty(this, 'lastname1', {
      enumerable: true,
      get() {
        return this.#lastname1;
      },
      set(valor) {
        if (!valor) throw new EmptyValueException("lastname1");
        this.#lastname1 = valor;
      }
    });

    // lastname2
    Object.defineProperty(this, 'lastname2', {
      enumerable: true,
      get() {
        return this.#lastname2;
      },
      set(valor) {
        this.#lastname2 = valor || "";
      }
    });

    // born
    Object.defineProperty(this, 'born', {
      enumerable: true,
      get() {
        return this.#born;
      },
      set(value) {
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) throw new EmptyValueException("born");
        this.#born = date;
      }
    });

    // picture
    Object.defineProperty(this, 'picture', {
      enumerable: true,
      get() {
        return this.#picture;
      },
      set(value) {

        this.#picture = value || "";
      }
    });


  }

  // metodo toString()
  toString() {

    const optlastname2 = this.#lastname2 ? `, LastName2: ${this.#lastname2}` : "";
    const optPicture = this.#picture ? `, picture: ${this.#picture}` : "";

    return `Name: ${this.#name}, LastName1: ${this.#lastname1} ${optlastname2}, Born: ${this.#born.toLocaleDateString()} ${optPicture}`;
  }
}

export { Person };