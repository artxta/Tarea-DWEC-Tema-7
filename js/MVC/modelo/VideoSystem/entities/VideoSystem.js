"use strict";

// importar excepciones
import {
  InvalidAccessConstructorException,
  EmptyValueException,
  CategoryExist,
  WrongClass,
  CategoryNoRegistrada,
  CategoryDefaultException,
  ObjetoYaExiste,
  ObjetoNoExiste,
  BaseException,
} from "../exceptions/exceptions.js";

// importar entities
import { Category } from "./Category.js";
import { Coordinate } from "./Coordinate.js";
import { Movie } from "./Movie.js";
import { Person } from "./Person.js";
import { Production } from "./Production.js";
import { Resource } from "./Resource.js";
import { Serie } from "./Serie.js";
import { User } from "./User.js";

// Singleton
let VideoSystem = (function () {

  let instantiated;
  // categoria por defecto
  let categoryDefault = new Category("Default", "Categorias que no pertenecen a ninguna otra");

  // clase VideoSystem
  class VideoSystem {
    #name = "VideoSystem"; // nombre del sistema por defecto
    // iterators

    #users = new Map(); //  Key: user.username, value: objeto User
    #productions = new Map(); // Key: production.title, Value: objeto Production

    // cambiar clave objeto por una string

    // Key: category.name, 
    // Value: objeto literal {obj: c, productions: new Set production, etc}
    #categories = new Map();
    // Key: objeto Actor, 
    // Value: objeto literal {obj: a, productions: new Set(production1, etc)}
    #actors = new Map();
    // Key: objeto Director, 
    // Value: objeto literal {obj: d, productions: new Set(production1, etc)
    #directors = new Map();

    // Mapas para flyweight Factory
    #personShared = new Map();
    #productionShared = new Map();
    #userShared = new Map();
    #categoryShared = new Map();

    constructor() {
      // si no se usa new
      if (!new.target) throw new InvalidAccessConstructorException();

      // Getter/Setter name
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

      // Getter categories, devuelve un iterator
      Object.defineProperty(this, 'categories', {
        enumerable: true,
        // función generadora
        get: function* () {
          for (const c of this.#categories.values()) {
            // devolver uno por uno
            yield c.obj;
          }
        },
        set(_) {// el simbolo _ significa ignorado por convención
          throw new BaseException("propiedad categories: no se puede usar setter");
        }
      });

      // Getter User
      Object.defineProperty(this, 'users', {
        enumerable: true,
        //  función generadora
        get: function* () {
          for (const u of this.#users.values()) {
            // devolver uno por uno
            yield u;
          }
        },
        set(_) {
          throw new BaseException("propiedad users: no se puede usar setter");
        }
      });

      // Getter productions
      Object.defineProperty(this, 'productions', {
        enumerable: true,
        get: function* () {
          // obtiene los production
          for (const p of this.#productions.values()) {
            yield p;
          }
        },
        set(_) {
          throw new BaseException("propiedad productions: no se puede usar setter");
        }
      });

      // Getter actors
      Object.defineProperty(this, 'actors', {
        enumerable: true,
        get: function* () {
          // obtiene los actors
          for (const v of this.#actors.values()) {
            yield v.obj;
          }
        },
        set(_) {
          throw new BaseException("propiedad actors: no se puede usar setter");
        }
      });

      // Getter Director
      Object.defineProperty(this, 'directors', {
        enumerable: true,
        get: function* () {

          // obtiene los directores
          for (const d of this.#directors.values()) {
            yield d.obj;
          }
        },
        set(_) {
          throw new BaseException("propiedad directors: no se puede usar setter");
        }
      });

    }

    // Añade una nueva categoría
    addCategory(...categorias) {
      for (let i = 0; i < categorias.length; i++) {
        const c = categorias[i];

        if (c === null || c === undefined) throw new EmptyValueException("categoria");
        if (!(c instanceof Category)) throw new WrongClass("Category", c.name);

        // Flyweight: reutilizar categoría existente si ya está en el Map
        if (!this.#categories.has(c.name)) {

          //   throw new CategoryExist(c.name);
          // } else {
          // si no existe la crea
          // se ha cambiado la clave por el nombre de la categoria
          // se ha cambiado el valor por un objeto literal con la categoria y el Set 
          this.#categories.set(c.name, { obj: c, productions: new Set() });
        }
      }

      return this.#categories.size;
    }


    // Elimina una categoría. Al eliminar la categoría,
    // sus productos pasan a la de por defecto.
    removeCategory(...categories) {

      // verificar que existe la categoria por defecto
      if (!this.#categories.has(categoryDefault.name)) {
        this.addCategory(categoryDefault);
      }
      const destinoSet = this.#categories.get(categoryDefault.name).productions;

      for (const c of categories) {
        // si no hay datos
        if (c === null || c === undefined) throw new EmptyValueException("category");
        // si se intenta borrar la categoria por defecto
        if (c.name === categoryDefault.name) throw new CategoryDefaultException();

        // si no se pasan para borrar categorias
        if (!(c instanceof Category)) throw new WrongClass("Category", c.name);

        // si esa categoria existe
        if (this.#categories.has(c.name)) {
          // copiar las entradas productions a la de por defecto
          const origenSet = this.#categories.get(c.name).productions;

          // copiar las entradas a la de por defecto
          for (const i of origenSet) {
            destinoSet.add(i);
          }


          // borrar categoria
          // si se borra una categoria tambien se borra todas las producciones que
          // estén asignadas al Set dentro del Map #categories
          this.#categories.delete(c.name);

        } else {
          throw new CategoryNoRegistrada(c.name);
        }
      }
      // devolver número de elementos
      return this.#categories.size;
    }

    // Getter users => en propiedades

    // addUser
    addUser(...users) {
      for (let i = 0; i < users.length; i++) {

        const user = users[i];

        // si usuario es null, o no definido
        if (user === null || user === undefined) throw new EmptyValueException("user");
        // si no es instancia de User
        if (!(user instanceof User)) throw new WrongClass("User", user);
        // comprobar si existe, no añadir

        if (this.#users.has(user.username)) {
          // comparar usuarios por email
          for (const u of this.#users.values()) {
            if (u.email === user.email) {
              console.warn("Usuario ya existe: " + user.username + " no se duplica");
              return this.#users.size;
            }
          }
        }

        // si no , pues añadirlo
        this.#users.set(user.username, user);
      }
      // devolve el número de usuarios
      return this.#users.size;
    }

    // removeUser
    removeUser(...users) {
      for (const c of users) {
        // comprobar entrada
        if ((c === null) || (c === undefined)) throw new EmptyValueException("user");
        if (!(c instanceof User)) throw new WrongClass("User", c);
        if (!(this.#users.has(c.username))) throw new ObjetoNoExiste(c);

        // eliminar usuario
        this.#users.delete(c.username);
        // devolver tamaño de usuarios
      }
      return this.#users.size;
    }

    // getter productions en propiedades de constructor

    // addProduction()
    addProduction(...productions) {
      for (const c of productions) {
        // comprobar entrada
        if ((c === null) || (c === undefined)) throw new EmptyValueException("productions");
        if (!(c instanceof Production)) throw new WrongClass("Production", c);
        // si tiene el mismo titulo y fecha es la misma Production
        if (this.#productions.has(c.title)) {
          const titulo = this.#productions.get(c.title).title;
          const fecha = this.#productions.get(c.title).publication.getTime();
          if ((titulo === c.title) && fecha === c.publication.getTime()) {
            console.warn("La producción ya existe: " + c.title + " no se duplica");
            return this.#productions.size;
            // throw new ObjetoYaExiste(c);
          }
        }

        // añadir Production

        this.#productions.set(c.title, c);

      }
      // devolver el número de elementos
      return this.#productions.size;
    }

    // removeProduction()
    removeProduction(...productions) {
      for (const p of productions) {
        // comprobar entrada
        if ((p === null) || (p === undefined)) throw new EmptyValueException("productions");
        if (!(p instanceof Production)) throw new WrongClass("Production", p.name);
        if (!this.#productions.has(p.title)) throw new ObjetoNoExiste(p.name);

        // borrar relaciones category, director, actor
        // 
        // recorrer categorias y si tiene esta production borrarla también

        // Aquí abajo se borran las relaciones:
        // Produccion - Category
        // Produccion - Director
        // Produccion - Actor
        // Key: category.name, 
        // Value: objeto literal {obj: a, productions: new Set(production1, etc)}

        // recorrer categorias
        for (const c of this.#categories.values()) {
          if (c.productions.has(p)) {
            this.deassignCategory(c.obj, p);
          }
        }

        // recorrer directores
        for (const d of this.#directors.values()) {
          if (d.productions.has(p)) {
            this.deassignDirector(d.obj, p);
          }
        }

        // recorrer actores
        for (const a of this.#actors.values()) {
          if (a.productions.has(p)) {
            this.deassignActor(a.obj, p);
          }
        }

        // eliminar
        this.#productions.delete(p.title);
      }
      // devolver tamaño de elementos
      return this.#productions.size;
    }


    // getters actor en propiedades del constructor

    // addActor()
    addActor(...actors) {
      for (const a of actors) {
        // comprobar entrada
        if ((a === null) || (a === undefined)) throw new EmptyValueException("actors");
        if (!(a instanceof Person)) throw new WrongClass("Person", a.name);
        if (this.#actors.has(`${a.name}_${a.lastname1}`)) {
          console.warn("El actor ya existe: " + a.name + " " + a.lastname1 + " no se duplica");
          return this.#actors.size;
          // throw new ObjetoYaExiste(a.name);
        }

        // añadir el actor
        this.#actors.set(`${a.name}_${a.lastname1}`, { obj: a, productions: new Set() });
      }
      return this.#actors.size;
    }

    // removeActor
    removeActor(...actors) {
      for (const a of actors) {
        // comprobar entrada
        if ((a === null) || (a === undefined)) throw new EmptyValueException("actors");
        if (!(a instanceof Person)) throw new WrongClass("Person", a.name);
        if (!this.#actors.has(`${a.name}_${a.lastname1}`)) throw new ObjetoNoExiste(a.name);

        // eliminar relaciones
        for (const production of this.#actors.get(`${a.name}_${a.lastname1}`).productions) {
          // dessasignar producciones de ese actor
          this.deassignActor(a, production);
        }

        // elimina el actor
        this.#actors.delete(`${a.name}_${a.lastname1}`);
      }
      // devuelve el número de actores
      return this.#actors.size;
    }

    // Getter Director implementado en propiedades

    // addDirector
    addDirector(...directors) {
      for (const dir of directors) {
        // comprobar entrada
        if ((dir === null) || (dir === undefined)) throw new EmptyValueException("directors");
        if (!(dir instanceof Person)) throw new WrongClass("Person", dir.name);
        if (this.#directors.has(`${dir.name}_${dir.lastname1}`)) {
          console.warn("El director ya existe: " + dir.name + " " + dir.lastname1 + " no se duplica");
          return this.#directors.size;
          // throw new ObjetoYaExiste(dir.name || "no definido");
        }

        // añade el objeto
        this.#directors.set(`${dir.name}_${dir.lastname1}`, { obj: dir, productions: new Set() });
      }
      // devolver número de directores
      return this.#directors.size;
    }

    // removeDirector()
    removeDirector(...directors) {
      for (const dir of directors) {
        // comprobar entrada
        if ((dir === null) || (dir === undefined)) throw new EmptyValueException("directors");
        if (!(dir instanceof Person)) throw new WrongClass("Person", dir.name);
        if (!this.#directors.has(`${dir.name}_${dir.lastname1}`)) throw new ObjetoNoExiste(dir.name || "no definido");

        // borrar relaciones
        for (const production of this.#directors.get(`${dir.name}_${dir.lastname1}`).productions) {
          // desassignar producciones de ese director
          this.deassignDirector(dir, production);
        }
        // borra el director
        this.#directors.delete(`${dir.name}_${dir.lastname1}`);
      }
      return this.#directors.size;
    }

    // assignCategory
    // Asigna uno más producciones a una categoría.
    // Si el objeto Category o Production no existen se añaden al sistema.
    assignCategory(category, ...production) {
      // comprobar entrada
      if ((category === null) || (category === undefined)) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      // flyweight solo se crea si no existe
      if (!(this.#categories.has(category.name))) {
        this.addCategory(category);
      }

      // obtener el Set dentro del Map de las categorias
      const categoriaGuardar = this.#categories.get(category.name).productions;
      // recorrer el rest
      for (const pro of production) {

        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("production");
        if (!(pro instanceof Production)) throw new WrongClass("production", pro.name);

        // comprobar si existe la categoria o la production
        // category si no existe se crea
        // production si no existe se crea
        if (!(this.#productions.has(pro.title))) {
          this.addProduction(pro);
        }

        // asignar las productions a la categoria
        // guarda la produccion dentro del set de la categoria
        // this.#categories.get(category.name).productions.add(productions)
        categoriaGuardar.add(pro);

      }

      // devolver el número de produccions asignadas a la categoria
      return categoriaGuardar.size;

    }

    // deassignCategory
    // Desasigna una o más producciones de una categoría.
    deassignCategory(category, ...productions) {
      // comprobar entrada
      if ((category === null) || (category === undefined)) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      if (!this.#categories.has(category.name)) throw new CategoryNoRegistrada(category.name);

      // obtener categoria
      const categoriaGuardar = this.#categories.get(category.name).productions;

      // recorrer el rest
      for (const pro of productions) {

        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // si existe esa production desasignar
        // this.#categories.get(category).productions.delete(pro);
        if (categoriaGuardar.has(pro)) {
          categoriaGuardar.delete(pro);

        }
      }
      // devolver tamaño de productions de esa categoria 
      return categoriaGuardar.size;
    }

    // assignDirector
    assignDirector(director, ...productions) {
      // comprobar entrada
      if ((director === null) || (director === undefined)) throw new EmptyValueException("director");
      if (!(director instanceof Person)) throw new WrongClass("Director", director.name);

      // añadir el director si no existe en el sistema
      if (!(this.#directors.has(`${director.name}_${director.lastname1}`))) {
        this.addDirector(director);
      }

      // Set dentro del Map  #directors
      const directorMap = this.#directors.get(`${director.name}_${director.lastname1}`).productions;

      // recorrer productions
      for (const p of productions) {
        // comprobar entrada
        if ((p === null) || (p === undefined)) throw new EmptyValueException("productions");
        if (!(p instanceof Production)) throw new WrongClass("Production", p.title);

        // si no existe la productions se añade al sistema
        if (!(this.#productions.has(p.title))) {
          this.addProduction(p);
        }

        // asignar la productions al director
        // this.#directors.get(`${director.name}_${director.lastname1}`).productions.add(p);
        directorMap.add(p);
      }
      // devolver el tamaño
      return directorMap.size;
    }

    // deassignDirector
    deassignDirector(director, ...productions) {
      // comprobar entrada
      if ((director === null) || (director === undefined)) throw new EmptyValueException("director");
      if (!(director instanceof Person)) throw new WrongClass("Director", director.name);
      // si no existe ese director lanza excepción
      if (!(this.#directors.has(`${director.name}_${director.lastname1}`))) throw new ObjetoNoExiste(director.name);

      // Obtener director
      const directorMap = this.#directors.get(`${director.name}_${director.lastname1}`).productions;

      // recorrer productions
      for (const pro of productions) {
        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // borrar production del director
        directorMap.delete(pro);

      }
      // devuelve tamaño de productions del director
      return directorMap.size;
    }

    // assignActor
    assignActor(actor, ...productions) {
      // comprobar entrada
      if ((actor === null) || (actor === undefined)) throw new EmptyValueException("actor");
      if (!(actor instanceof Person)) throw new WrongClass("Actor", actor.name);

      // si no existe el actor se crea
      if (!(this.#actors.has(`${actor.name}_${actor.lastname1}`))) {
        this.addActor(actor);
      }

      // actor Map
      const actorSet = this.#actors.get(`${actor.name}_${actor.lastname1}`).productions;

      // recorrer productions
      for (const pro of productions) {
        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // si no existe la production se añade
        if (!(this.#productions.has(pro.title))) {
          this.addProduction(pro);
        }

        // asignar esa productions al actor
        // this.#actors.get(actor).add(pro);
        actorSet.add(pro);
      }
      // devolver número de productions del actor
      return actorSet.size;

    }

    // deassignActor
    deassignActor(actor, ...productions) {
      // comprobar entrada
      if ((actor === null) || (actor === undefined)) throw new EmptyValueException("actor");
      if (!(actor instanceof Person)) throw new WrongClass("Actor", actor.name);
      // si no existe el actor lanza excepción
      if (!(this.#actors.has(`${actor.name}_${actor.lastname1}`))) throw new ObjetoNoExiste(actor.name);

      // El Set de las producciones del Map actors
      const actorSet = this.#actors.get(`${actor.name}_${actor.lastname1}`).productions;

      // recorrer productions
      for (const pro of productions) {
        // comprobar entrada
        if ((pro === null) || (pro === undefined)) throw new EmptyValueException("Production");
        if (!(pro instanceof Production)) throw new WrongClass("Productions", pro.name);

        // borrar productions del actor 
        actorSet.delete(pro);

      }
      // devuelve tamaño de productions del actor
      return actorSet.size;
    }

    // generador getCast()
    // obtener los actores de una producción
    * getCast(production) {
      // comprobar entrada
      if ((production === null) || (production === undefined)) throw new EmptyValueException("production");
      if (!(production instanceof Production)) throw new WrongClass("Production", production.title);

      // recorrer el Map de actores
      for (const actor of this.#actors.values()) {
        // si en el set del actor está esa produccion devolver el actor
        if (actor.productions.has(production)) {
          yield actor.obj; // devuelve el actor
        }
      }
    }

    // getProductionsDirector
    // obtener las producciones de un director
    * getProductionsDirector(director) {
      // comprobar entrada
      if (director === null || director === undefined) throw new EmptyValueException("director");
      if (!(director instanceof Person)) throw new WrongClass("Director", director.name);

      // si el director no existe
      if (!this.#directors.has(`${director.name}_${director.lastname1}`)) throw new ObjetoNoExiste(director.name);

      const ProduccionesDirector = this.#directors.get(`${director.name}_${director.lastname1}`).productions;
      // recorrer el Map
      for (const production of ProduccionesDirector) {
        // devolver production del director
        yield production;
      }

    }

    // getProductionsActor
    // obtener las produccion de un actor
    * getProductionsActor(actor) {
      // comprobar datos
      if (!actor) throw new EmptyValueException("actor");
      if (!(actor instanceof Person)) throw new WrongClass("Actor", actor.name);
      if (!this.#actors.has(`${actor.name}_${actor.lastname1}`)) throw new ObjetoNoExiste(actor.name);

      const ProduccionesActor = this.#actors.get(`${actor.name}_${actor.lastname1}`).productions;
      for (const pro of ProduccionesActor) {
        // devolver produccion del actor
        yield pro;
      }

    }


    // getProductionsCategory
    * getProductionsCategory(category) {
      // comprobar la entrada de datos
      if (!category) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      if (!this.#categories.has(category.name)) throw new CategoryNoRegistrada(category.name);

      const ProduccionesCategoria = this.#categories.get(category.name).productions;
      // devolver producciones de categoria
      for (const pro of ProduccionesCategoria) yield pro;

    }

    // FLYWEIGHT FACTORY (a parte del sistema tiene su propia base de datos)


    // createPerson
    createPerson(name, lastname1, born, lastname2 = "", picture = "") {
      // comprobar entrada
      if (!name) throw new EmptyValueException("name");
      if (!lastname1) throw new EmptyValueException("lastname1");
      if (!born) throw new EmptyValueException("born");

      // clave para guardar y buscar
      const clave = `${name}_${lastname1}_${new Date(born).getTime()}`;

      // comprobar si no existe la guarda en el pool
      if (!this.#personShared.has(clave)) {
        this.#personShared.set(clave, new Person(name, lastname1, born, lastname2, picture));
      }

      // devuelve el objeto
      return this.#personShared.get(clave);
    }

    /**
     * createProduction
     */
    createProduction(
      title,
      publication,
      nationality = "Sin Nacionalidad",
      synopsis = "Sin synopsis",
      image = "Sin imagen",
      // Movie o Serie
      resources = [],
      locations = [],
      // Serie
      seasons = 0
    ) {
      // comprobar entrada
      if (!title || !publication) throw new EmptyValueException("title");

      // clave para guardar o buscar
      const clave = `${title}_${publication}`;

      // comprobar si existe
      if (!this.#productionShared.has(clave)) {

        //  si no tiene capitulos es una Movie
        if (seasons === 0) {
          this.#productionShared.set(clave, new Movie(title, publication, nationality, synopsis, image, resources, locations));
        } else {

          //  si tiene capitulos es una Serie
          this.#productionShared.set(clave, new Serie(title, publication, nationality, synopsis, image, resources, locations, seasons));
        }

      }

      // devuelve el objeto
      return this.#productionShared.get(clave);

    }

    /**
     * createUser
     */
    createUser(username, email, password) {
      // comprobar entrada
      if (!username || !email || !password) throw new EmptyValueException("");

      // clave para guardar o buscar
      const clave = `${username}_${email}_${password}`;

      // comprobar si existe el User
      if (!this.#userShared.has(clave)) {
        this.#userShared.set(clave, new User(username, email, password));
      }
      // devolver usuario
      return this.#userShared.get(clave);
    }

    /**
     * createCategory()
     */
    createCategory(name, description = "") {
      // comprobar entrada
      if (!name) throw new EmptyValueException("name");

      // clave
      const clave = name;

      // comprobar si existe
      if (!this.#categoryShared.has(clave)) {
        this.#categoryShared.set(clave, new Category(name, description));
      }

      // devolver objeto
      return this.#categoryShared.get(clave);

    }

    /**
     * findProductions
     */
    * findProductions(filter = () => true, sort = null) {
      // convertir a Array
      let result = [...this.#productions.values()].filter(filter);
      //  ordenar si existe sort
      if (sort) {
        result.sort(sort);
      }
      // devolver las producciones
      for (const p of result) yield p;
    }

    /**
     * filterProductionsInCategory
     */
    * filterProductionsInCategory(category, filter = () => true, sort = null) {
      // validar datos
      if (!category) throw new EmptyValueException("category");
      if (!(category instanceof Category)) throw new WrongClass("Category", category.name);
      if (!this.#categories.has(category.name)) throw new CategoryNoRegistrada(category.name);

      // convertir a Array
      let result = [...this.#categories.get(category.name).productions].filter(filter);
      // ordenar si existe
      if (sort) {
        result.sort(sort);
      }
      // devolver uno por uno las producciones
      for (const p of result) yield p;
    }
  }

  // Estructura SingleTon
  function init() {
    const video = new VideoSystem();
    // crear categoria por defecto
    video.addCategory(categoryDefault);
    return video;
  }

  // si ya esta instanciado no crea otra instancia, si no , si crea una
  return {
    getInstance() {
      if (!instantiated) instantiated = init();
      return instantiated;
    },
    // objetos 
  };




})();

// exportar VideoSystem
export {
  VideoSystem,
  Category,
  Coordinate,
  Movie,
  Person,
  Production,
  Resource,
  Serie,
  User
}
