"use strict";

// importar excepciones
import {
  InvalidAccessConstructorException,
  EmptyValueException,
} from "../exceptions/exceptions.js";

// contructor
class User {
  // atributos privados
  #username;
  #email;
  #password;

  constructor(username, email, password) {
    // si no se usa new para el constructor
    if (!new.target) throw new InvalidAccessConstructorException();

    // validar parametros
    if (!username) throw new EmptyValueException("username");
    if (!email) throw new EmptyValueException("email");
    if (!password) throw new EmptyValueException("password");

    // asignar parametros
    this.#username = username;
    this.#email = email;
    this.#password = password;
  }

  // getters y setters
  // username
  get username() {
    return this.#username;
  }
  set username(valor) {
    if (!valor) throw new EmptyValueException("username");
    this.#username = valor;
  }

  // email
  get email() {
    return this.#email;
  }
  set email(valor) {
    if (!valor) throw new EmptyValueException("email");
    this.#email = valor;
  }

  // password
  get password() {
    return this.#password;
  }
  set password(valor) {
    if (!valor) throw new EmptyValueException("password");
    this.#password = valor;
  }

  // metodo toString()
  toString() {
    return `User: ${this.#username},
    Email: ${this.#email},
    Password: ${this.#password}\n`;
  }

}

export { User };