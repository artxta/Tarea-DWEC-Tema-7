"use strict";
import { BaseException, InvalidAccessConstructorException } from "../MVC/modelo/VideoSystem/exceptions/exceptions.js";

// importar User class
import { User } from "../MVC/modelo/VideoSystem/entities/User.js";

// excepción
class AuthenticationServiceException extends BaseException {
  constructor(message = 'Error: Authenticacion Service Exception', fileName, lineNumber) {
    super(message, fileName, lineNumber);
  }
}

// Singleton AuthenticationService
const AuthenticationService = (function () {
  let instantiated;

  // iniciar Singleton
  function init() {
    class Authenticacion {
      // array usuarios en el sistema this.#MODEL.users
      #usuarios

      constructor() {
        // si no se instancia con new lanzar error
        if (!new.target) throw new InvalidAccessConstructorException();
      }

      // metodos

      /**
       * Valida el usuario y contraseña guardada 
       * @param {*} username 
       * @param {*} password
       * @param {*} datos usuarios guardados
       */
      validateUser(username, password, datos) {
        const usuario = this.getUser(username, datos);
        if (!usuario) return false;

        const passBase64 = this.#hashPassword(password);
        // console.dir(usuario);
        console.log(`Usuario ${usuario.username}: hash valido = ${usuario.password}, hash introducido: ${passBase64}`);
        return usuario.password === passBase64;
      }

      /**
       * devolver objeto user dando el nombre del usuario
       * @param {*} username nombre del usuario
       */
      getUser(username, datos) {
        return datos.find((usuario) => usuario.username === username) || null;
      }

      // ofuscar debilmente la contraseña con base64, lo suyo seria con sha-256
      #hashPassword(password) {
        return btoa(unescape(encodeURIComponent(password)));
      }
    }

    const auth = new Authenticacion();
    Object.freeze(auth);
    return auth;
  }

  // devolver singleton
  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
}());

export default AuthenticationService;



