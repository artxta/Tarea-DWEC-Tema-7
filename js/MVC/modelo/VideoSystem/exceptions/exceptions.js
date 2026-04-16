"use strict";
// excepciones personalizadas
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) Error.captureStackTrace(this, BaseException)
  }
}

// excepción se invoca constructor sin "new"
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Constructor can´t be called as a function", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

// excepción campo vacio
class EmptyValueException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super(`El parametro ${param} no puede estar vació o es invalido`, fileName, lineNumber);
    this.name = "EmptyValueException";
  }
}

// excepción clase abstracta
class AbstractClassException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: La clase ${className} es abstracta`, fileName, lineNumber);
    this.className = className;
    this.name = "AbstractClassException";
  }

}

// excepción Clase no correcta
class WrongClass extends BaseException {
  constructor(classOk, classNoOk, fileName, lineNumber) {
    super(`Error: La clase ${classNoOk} No es la adecuada, deberia ser ${classOk}`,
      fileName, lineNumber);
    this.classNoOk = classNoOk;
    this.classOk = classOk;
    this.name = "WrongClass";
  }
}

// Excepciones expecificas para VideoSystem

// categoria ya existe
class CategoryExist extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: La categoria ${className} ya existe.`, fileName, lineNumber);
    this.className = className;
    this.name = "CategoryExist";
  }
}

// categoria no existe
class CategoryNoRegistrada extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: No esta registrada la categoria ${className}`, fileName, lineNumber);
    this.className = className;
    this.name = "CategoryNoRegistrada";

  }
}

// no borrar categoria por defecto
class CategoryDefaultException extends BaseException {
  constructor(fileName, lineNumber) {
    super("No puedes borrar la categoria por defecto", fileName, lineNumber);
    this.name = "CategoryDefaultException";
  }
}

// excepción Propiedad existe
class ObjetoYaExiste extends BaseException {
  constructor(objeto, fileName, lineNumber) {
    super(`Error: el objeto ${objeto} ya existe`, fileName, lineNumber);
    this.name = "ObjetoYaExiste";

  }
}

// excepción Propiedad no existe
class ObjetoNoExiste extends BaseException {
  constructor(objeto, fileName, lineNumber) {
    super(`Error: el objeto ${objeto} NO existe en el sistema`);
    this.name = "ObjetoNoExiste";
  }
}

// exportar excepciones
export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  AbstractClassException,
  WrongClass,
  CategoryExist,
  CategoryNoRegistrada,
  CategoryDefaultException,
  ObjetoYaExiste,
  ObjetoNoExiste,
}

