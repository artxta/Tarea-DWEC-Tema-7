"use strict";

import { Coordinate } from "./modelo/VideoSystem/entities/Coordinate.js";
import { Resource } from "./modelo/VideoSystem/entities/Resource.js";

class VideoSystemController {
  // propiedades privadas
  #MODEL;
  #VIEW;

  constructor(model, view) {
    this.#MODEL = model;
    this.#VIEW = view;
    // pintar las categorias al iniciar
    this.#VIEW.bindLoad(this.handleInit); // despues de cargar datos
    this.#VIEW.bindInit(this.handleInit);  // al pulsar el inicio o Logo

    this.#VIEW.bindShowFichaDirector(this.handleShowFichaDirector); // showFichaDirector - mostrar la ficha del director
    this.#VIEW.bindShowFichaActor(this.handleShowFichaActor); // showFichaActor - mostrar la ficha del actor
    this.#VIEW.bindGetProductionsInCategory(this.handleGetProductionsInCategory); // getProductionsInCategory - mostrar producciones de una categoria
    this.#VIEW.bindShowFichaProduction(this.handleShowFichaProduction); // showFichaProduction - mostrar ficha produccion
    this.#VIEW.bindNewWindow(this.handleOpenInNewWindow); // abrir fichas en nueva ventana , arreglado para history
    this.#VIEW.bindShowModal(this.handleShowModal); // devolver datos para crear nueva produccion, borrar , asignar, etc
    this.#VIEW.bindSaveProduction(this.handleSaveProduction); // guardar Nueva Produccion
    this.#VIEW.bindShowDeleteProductionModal(this.handleShowDeleteProductionModal); // mostrar Borrar produccion
    this.#VIEW.bindShowAssignActores(this.handleShowAssignActores); //mostrar modal asignar actores/directores

    // añadir evento del historial
    window.addEventListener("popstate", (event) => {
      this.handlePopstate(event);
    });

  }

  // manejadores handle

  // manejador despues de la carga, inicia el metodo onInit()
  handleInit = () => {
    // añade el estado inicial al history
    if (!history.state) {
      this.addHistory({ action: 'init' }); // 
    }
    this.onInit(this.#MODEL.categories, this.#MODEL.directors, this.#MODEL.actors, this.#MODEL.productions);
  }

  /**
   * Añade al historial
   * @param {*} objetoDatos 
   */
  addHistory = (objetoDatos) => {
    try {
      console.log(">Añadir a history: ");
      console.dir(objetoDatos);
      // evitar que al hacer click se vuelva a hacer pushstate
      if (
        history.state?.clave !== objetoDatos.clave ||
        history.state?.action !== objetoDatos.action
      ) {
        history.pushState(objetoDatos, null);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // handle para asignar actores/directores
  handleShowAssignActores = (comando, parametros = {}) => {
    try {
      switch (comando) {
        case "cargar":
          // mostrar formulario producciones/actores/directores
          this.#VIEW.showAssignActores(
            this.#MODEL.productions,
            this.#MODEL.actors,
            this.#MODEL.directors
          );
          break;
        case "casting":
          // enviar en un objeto actores, directores de una produccion
          const value = parametros.produccion;
          // variables
          let produccion;
          let directores = [];
          let actores = [];

          // producciones
          this.#MODEL.productions.forEach(p => {
            // produccion es el objeto de la producción
            if (p.title === value) {
              produccion = p;
            }
          });

          // directores de esa producción
          this.#MODEL.directors.forEach(d => {
            this.#MODEL.getProductionsDirector(d).forEach(prod => {
              if (prod === produccion) {
                // guardar clave
                directores.push(`${d.name}_${d.lastname1}`);
              }
            });
          });

          // actores
          this.#MODEL.getCast(produccion).forEach(actor => {
            actores.push(`${actor.name}_${actor.lastname1}`);
          });


          // devuelve los actores y directores de esa producción
          return {
            actores: actores,
            directores: directores
          };

          break;
        case "guardar":
          // como recibe los datos desde Vista
          /*
            const datos = {
            produccion: this.selectAsignProduction,
            actores: this.#assignActores,
            directores: this.#assignDirectores
          };
  
          // llamar al handle
          handle("guardar", datos);
            */

          // asignar Actores a Produccion
          console.log("Asignar Actor/Director:");
          console.dir(parametros);

          let prod = null;

          // guardar produccion como objeto
          this.#MODEL.productions.forEach(pro => {
            if (pro.title === parametros.produccion) prod = pro;
          });

          // recorre todos los actores, y tambien recorre los actores que se quieren asignar
          // si coincide que un actor es de los que se quiere asignar
          // ejecuta el comando asignarActor a la producción con ese actor
          this.#MODEL.actors.forEach(actor => {
            for (const actorAsignado of parametros.actores) {
              const clave = `${actor.name}_${actor.lastname1}`;
              // añadir actor a producción
              if (clave === actorAsignado) {
                this.#MODEL.assignActor(actor, prod);
              }
            }
          });

          // asignar Directores a Producción, el mismo sistema que actores
          this.#MODEL.directors.forEach(director => {
            for (const direcAsignado of parametros.directores) {
              const clave = `${director.name}_${director.lastname1}`;
              // añadir director a producción
              if (clave === direcAsignado) {
                this.#MODEL.assignDirector(director, prod);
              }
            }
          });

          // crear confirmación
          this.#VIEW.showResultadoModal("mostrar", `<h4>Asignación realizada a la producción: ${parametros.produccion}</h4>`);

          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // handle para borrar producción
  handleShowDeleteProductionModal = (comando, seleccion = "") => {
    try {
      switch (comando) {
        case "cargar":
          // mostrar modal Borrar Production
          this.#VIEW.showDeleteProductionModal(this.#MODEL.productions);
          break;
        case "verImagen":
          if (seleccion !== "") {
            this.#VIEW.showDeleteProductionModal(this.#MODEL.productions, seleccion);
          }
          break;
        case "borrar": {
          if (seleccion === "") return;

          let productionSeleccionada = null;
          // buscar produccion
          for (const production of this.#MODEL.productions) {
            if (production.title === seleccion) {
              productionSeleccionada = production;
              break;
            }
          }
          // salir si no existe
          if (!productionSeleccionada) return;
          // borrar produccion
          this.#MODEL.removeProduction(productionSeleccionada);
          // mostrar confirmación del borrado
          this.#VIEW.showResultadoModal("mostrar", `<h4>Producción borrada: ${seleccion}</h4>`);
          break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // handle para guardar Nueva Produccion
  handleSaveProduction = (datosGuardar = {}) => {
    /*
       en Vista -> handle({
          categoria: document.querySelector("#selectCategory")?.value,
          tipo: document.querySelector("#selectPeliculaSerie")?.value,
          titulo: document.querySelector("#titulo")?.value,
          nacionalidad: document.querySelector("#nacionalidad")?.value,
          publication: document.querySelector("#publication")?.value,
          synopsis: document.querySelector("#synopsis")?.value,
          imageName: document.querySelector("#inputFile")?.files[0]?.name || null,
          seasons: document.querySelector("#seasons")?.value || 0,
          resources: this.#newProductionResource,
          locations: this.#newProductionLocation,
          actores: this.#newProductionActors,
          directores: this.#newProductionDirectors
        });
    */

    try {
      /* #MODEL.createProduction
        title, // Obligatorio
        publication, // obligatorio
        nationality = "Sin Nacionalidad",
        synopsis = "Sin synopsis",
        image = "Sin imagen",
        // Movie o Serie
        resources = [],
        locations = [],
        // Serie
        seasons = 0
      */

      let titulo = "";
      let publication = "";
      let capitulos = "";
      let resources = [];
      let locations = [];
      if (datosGuardar.titulo) {
        titulo = datosGuardar.titulo;
      } else {
        return;
      }
      if (datosGuardar.publication) {
        publication = datosGuardar.publication;
      } else {
        return;
      }

      // el modelo solo crea una serie si tiene al menos 1 Capitulo
      // si se crea una serie con 0 capitulos el modelo crea objeto Pelicula
      // esto lo evita
      if (datosGuardar.seasons <= 0 && datosGuardar.tipo === "SE") {
        capitulos = 1;
      } else {
        capitulos = datosGuardar.seasons;
      }

      // crear array de resources
      datosGuardar.resources.forEach(r => {
        resources.push(new Resource(r.duration, r.link));
      });

      // crear array de locations
      datosGuardar.locations.forEach(l => {
        locations.push(new Coordinate(l.latitude, l.longitude));
      });

      // crear Producción
      const produccionGuardada = this.#MODEL.createProduction(
        titulo,
        new Date(publication), // convertir a tipo Date
        datosGuardar.nacionalidad,
        datosGuardar.synopsis,
        datosGuardar.imageName,
        resources, // tipo array de Resources
        locations, // tipo array de Coordinates
        Number.parseInt(capitulos) // tipo int
      );

      // test
      console.log("Nueva Produccion -Controlador-:");
      console.dir(produccionGuardada);

      // añadir produccion al sistema
      this.#MODEL.addProduction(produccionGuardada);

      // assignar Categoria, 
      // buscar el objeto categoria
      for (const categoria of this.#MODEL.categories) {
        if (categoria.name === datosGuardar.categoria) {
          this.#MODEL.assignCategory(categoria, produccionGuardada);
          break;
        }
      }

      // asignar actores
      // buscar el objeto Actor
      for (const actor of this.#MODEL.actors) {
        for (const actorVista of datosGuardar.actores) {
          //  si el la clave del actor coincide con el value de la vista(se ha usado la clave)
          // asignar ese actor a la producción
          // comprobar entrada
          //console.log(`Comparando actor: ${actor.name}_${actor.lastname1} con ${actorVista.value}`);
          // comparar claves
          if (`${actor.name}_${actor.lastname1}` === actorVista.clave) {
            // asignar actor a pelicula
            this.#MODEL.assignActor(actor, produccionGuardada);
            console.log(`Actor ${actor.name} ${actor.lastname1} asignado a la producción ${produccionGuardada.title}`);
          }
        }
      }

      // asignar directores
      for (const director of this.#MODEL.directors) {
        for (const dirVista of datosGuardar.directores) {
          //  si la clave del director coincide cn la clave usada en la vista 
          // assignar ese director a la producción
          //console.log(`Comparando director: ${director.name}_${director.lastname1} con ${dirVista.value}`);
          // comparar claves
          if (`${director.name}_${director.lastname1}` === dirVista.clave) {
            // assignar director a la pelicula
            this.#MODEL.assignDirector(director, produccionGuardada);
            console.log(`Director ${director.name} ${director.lastname1} asignado a la producción ${produccionGuardada.title}`);
          }
        }
      }

      // test Ver casting de la pelicula
      // console.log("Ver Casting de la Nueva Producción: ")
      // for (const a of this.#MODEL.getCast(produccionGuardada)) {
      //   console.log(`${a.name}`);
      // }

      let resource = "";
      let location = "";
      let actor = "";
      let director = "";
      let tipo = (datosGuardar.tipo === "SE") ? "Serie" : "Pelicula";

      datosGuardar.resources.forEach(e => {
        resource += `<br>-Duración: ${e.duration}min., Link: ${e.link} `;
      });

      datosGuardar.locations.forEach(e => {
        location += `<br>-Latitude: ${e.latitude}º, Longitude: ${e.longitude}º  `;
      });

      datosGuardar.actores.forEach(e => {
        actor += `<br>-Nombre: ${e.nombre} `;
      });

      datosGuardar.directores.forEach(e => {
        director += `<br>-Nombre: ${e.nombre} `;
      });

      this.#VIEW.showResultadoModal("mostrar", `
        <h3>Nueva Producción Guardada:</h3>
        <p>Categoria: ${datosGuardar.categoria}</p>
        <p>Tipo: ${tipo}</p>
        <p>Titulo: ${datosGuardar.titulo}</p>
        <p>Nacionalidad: ${datosGuardar.nacionalidad}</p>
        <p>Publication: ${datosGuardar.publication}</p>
        <p>Synopsis: ${datosGuardar.synopsis}</p>
        <p>Nombre Imagen: ${datosGuardar.imageName}</p>
        <p>Temporadas: ${datosGuardar.seasons}</p>

        <p>Resources: ${resource}</p>
        <p>Locations: ${location}</p>
        <p>Actores: ${actor}</p>
        <p>Directores: ${director}</p>
        <p>Capitulos: ${datosGuardar.seasons}</p>

        `);

    } catch (e) {
      console.error(e);
    }
  }

  // handle de bindShowModal
  handleShowModal = (datos) => {
    switch (datos) {
      // devolver las categorias
      case "categorias":
        // mostrar las categorias disponibles en el modal
        this.#VIEW.showModal("produccion", this.#MODEL.categories);
        break;
      case "actoresDirectores":
        // cargar los selectores de actores y directores de la produccion
        this.#VIEW.showModal("tresProduction", [], this.#MODEL.actors, this.#MODEL.directors);
        break;
      default:
        return null;
    }
  }

  /**
   * atras/delante del historial
   * @param {*} event 
   */
  handlePopstate = (event) => {
    if (event.state) {
      console.log(">Restaurar history: ");
      console.dir(event.state);

      // variables
      const action = event.state.action;

      // buscar y devolver objeto por clave
      const clave = event.state.clave;


      // acciones
      //  restaurar ver ficha Director
      if (action === 'showFichaDirector') {
        // busca y devuelve el objeto original director y el array productions
        for (const d of this.#MODEL.directors) {
          if (clave === (d.name + "_" + d.lastname1)) {
            const productions = Array.from(this.#MODEL.getProductionsDirector(d));

            this.#VIEW.showFichaDirector(d, productions);
            break;
          }
        }
        // restaurar ver ficha actor
      } else if (action === 'showFichaActor') {
        // busca y devuelve el objeto original actor y el array productions
        for (const a of this.#MODEL.actors) {
          if (clave === (a.name + "_" + a.lastname1)) {
            // obtener producciones de ese actor, no guardar array en history, me da problemass
            const productions = Array.from(this.#MODEL.getProductionsActor(a));
            // mostrarlo
            this.#VIEW.showFichaActor(a, productions);
            break;
          }
        }

        // restaurar ver producciones de categoria
      } else if (action === 'getProductionsInCategory') {
        // buscar esa categoria y devolverla desde el popstate
        for (const c of this.#MODEL.categories) {
          if (clave === c.name) {
            // devolver la categoria para verla
            console.dir(c);
            this.#VIEW.listProductions(this.#MODEL.getProductionsCategory(c), c.name);
            break;
          }
        }

        // restaurar ver ficha produccion
      } else if (action === 'showFichaProduction') {

        let directores = [];
        // buscar esa produccion y devolverla
        for (const p of this.#MODEL.productions) {
          // devolver la producción para verla
          if (clave === p.title) {
            // directores no hay metodos para devolver directamente el director
            for (const dir of this.#MODEL.directors) {
              for (const pro of this.#MODEL.getProductionsDirector(dir)) {
                // añadir director
                if (clave === pro.title) directores.push(dir);

              }
            }
            const actores = Array.from(this.#MODEL.getCast(p));
            this.#VIEW.showFichaProduction(p, actores, directores);
            break;
          }
        }

      } else if (action === 'init') {
        this.onInit(this.#MODEL.categories, this.#MODEL.directors, this.#MODEL.actors, this.#MODEL.productions);
      }

    } else {
      // Si no hay estado, volver a la vista inicial
      this.onInit(this.#MODEL.categories, this.#MODEL.directors, this.#MODEL.actors, this.#MODEL.productions);
    }

  }

  /**
   * Mostrar ficha director
   * @param {*} keyDirector 
   * @returns 
   */
  handleShowFichaDirector = (keyDirector) => {
    try {
      let director;
      let productions;

      // buscar el director
      for (const d of this.#MODEL.directors) {
        const key = d.name + "_" + d.lastname1;
        if (key === keyDirector) {
          director = d;
        }
      }
      //  si no hay directores
      if (!director) return null;
      productions = Array.from(this.#MODEL.getProductionsDirector(director));
      // historial
      this.addHistory({
        action: 'showFichaDirector',
        clave: director.name + "_" + director.lastname1,
      });
      // devolver datos
      return { director, productions }

    } catch (e) {
      console.error(e);
    }
  }


  /**
   * devuelve un objeto tipo {objActor, [producciones]}
   * @param {*} keyActor 
   */
  handleShowFichaActor = (keyActor) => {
    try {
      let actor;
      let productions;

      // buscar el actor
      for (const a of this.#MODEL.actors) {
        const key = a.name + "_" + a.lastname1;
        if (key === keyActor) {
          actor = a;
        }
      }
      // convierte las producciones a array
      productions = Array.from(this.#MODEL.getProductionsActor(actor));
      // historial usa una clave unica para cada actor
      this.addHistory({
        action: 'showFichaActor',
        clave: actor.name + "_" + actor.lastname1,

      });
      // devolver datos
      return { actor, productions };
    } catch (e) {
      console.error(e);
    }
  }


  /**
   * obtener las producciones de una categoria
   */
  handleGetProductionsInCategory = (nombreCategoria) => {
    // buscar la categoria con ese nombre
    for (const cat of this.#MODEL.categories) {
      if (cat.name === nombreCategoria) {
        // historial
        this.addHistory({
          action: 'getProductionsInCategory',
          clave: cat.name
        });
        // si lo ha encontrado devuelve las producciones
        return this.#MODEL.getProductionsCategory(cat);
      }
    }
    // si no lo ha encontrado devuelve un array vacio
    return [];
  }

  /**
   * del titulo de una producción devuelve un objeto literal con 
 * obj produccion,
 * array actores,
 * array directores
 */
  handleShowFichaProduction = (nombreProduction) => {
    try {

      // buscar el objeto entre las producciones
      let produccion;
      let actores = [];
      let directores = [];
      for (const pro of this.#MODEL.productions) {
        if (pro.title === nombreProduction) {
          produccion = pro;
        }
      }
      // actores - convertir a Array
      actores = Array.from(this.#MODEL.getCast(produccion));
      // directores no hay metodos para devolver directamente el director
      for (const dir of this.#MODEL.directors) {
        for (const pro of this.#MODEL.getProductionsDirector(dir)) {
          // añadir director
          if (pro.title === nombreProduction) directores.push(dir);
        }
      }
      // historial
      this.addHistory({
        action: 'showFichaProduction',
        clave: produccion.title,
      });
      // devolver objeto
      return { produccion, actores, directores };

    } catch (e) {
      console.error(e);
    }
  }

  /**
   * segun la ficha que se quiera abrie en nueva ventana, devuelve unos datos o otros
   * @param {*} tipo 
   * @param {*} key 
   * @returns 
   */
  handleOpenInNewWindow = (tipo, key) => {

    // si la ficha es produccion
    if (tipo === "production") {
      let produccion;
      const actores = [];
      const directores = [];

      for (const pro of this.#MODEL.productions) {
        if (pro.title === key) {
          produccion = pro;
          break;
        }
      }

      if (!produccion) return null;
      // añade los datos de los actores
      for (const actor of this.#MODEL.getCast(produccion)) {
        actores.push(actor);
      }
      // añade los datos de los directores
      for (const dir of this.#MODEL.directors) {
        for (const pro of this.#MODEL.getProductionsDirector(dir)) {
          if (pro.title === key) {
            directores.push(dir);
          }
        }
      }
      // devuelve los datos para mostrar ficha produccion
      return {
        produccion,
        actores,
        directores,
        popupKey: produccion.title,
      };
    }

    // si es del tipo actor
    if (tipo === "actor") {
      let actor;

      // busca el actor
      for (const item of this.#MODEL.actors) {
        if (`${item.name}_${item.lastname1}` === key) {
          actor = item;
          break;
        }
      }

      if (!actor) return null;

      // devuelve los datos parra mostrar la ficha del actor
      return {
        actor,
        productions: Array.from(this.#MODEL.getProductionsActor(actor)),
        popupKey: `${actor.name}_${actor.lastname1}`,
      };
    }

    // si es del tipo director
    if (tipo === "director") {
      let director;

      // busca el director
      for (const item of this.#MODEL.directors) {
        if (`${item.name}_${item.lastname1}` === key) {
          director = item;
          break;
        }
      }

      if (!director) return null;
      // devuelve los datos para mostrar la ficha del director
      return {
        director,
        productions: Array.from(this.#MODEL.getProductionsDirector(director)),
        popupKey: `${director.name}_${director.lastname1}`,
      };
    }

    return null;
  }




  // metodos
  /**
   * crea la Vista inicial
  */
  onInit = (categories, directors, actors, productions) => {
    // obtener las categorias
    const cat = [...categories];
    const dir = [...directors];
    const act = [...actors];
    const pro = [...productions]

    this.#VIEW.init(cat, dir, act, pro);


  };

  /**
   * Carga los datos iniciales, los carga desde App, una vez al inicio
   * @param {*} datos 
   */
  onLoad = (datos) => {
    /*
    estructura de datos
    
    const datos = {
      users: [ {username: "",email: "",pass: ""},],
      categories: [
        {
          name: "",
          description: "",
          productions: [
            {
              title: "",
              publication: "2026-01-01",
              nationality: "",
              synopsis: "",
              image: "",
              actors: [ { name: "", lastname1: "", born: "1990-01-01" }, ],
              directors: [ { name: "", lastname1: "", born: "1990-01-01" },],
              resources: [{ duration: "90", link: "pelicula_La_Cosa.avi" },],
              locations: [{ latitude: "37.99", longitude: "-1.15" },],
            }, 
          ]
        },
      ],
    };
    */
    try {

      const users = datos.users;
      const categories = datos.categories;
      // añadir usuarios
      for (const u of users) {
        this.#MODEL.addUser(this.#MODEL.createUser(u.username, u.email, u.pass));
      }

      // añadir categorias
      for (const cat of categories) {
        // crear y añadir categoria
        // crear
        const catCreada = this.#MODEL.createCategory(cat.name, cat.description);
        // guardar
        this.#MODEL.addCategory(catCreada);

        // añadir todas producciones de la categoria
        for (const pro of cat.productions) {

          // cambiar funcionamiento de fechas
          const publicationRaw = pro.publication ?? pro.fecha;
          const publication = publicationRaw instanceof Date ? publicationRaw : new Date(publicationRaw);
          const nationality = pro.nationality ?? pro.nac ?? "";
          const synopsis = pro.synopsis || "";
          const image = pro.image || "";
          const resources = pro.resources || [];
          const locations = pro.locations || [];
          const seasons = pro.seasons || 0;
          // crear
          const proCreada = this.#MODEL.createProduction(
            pro.title,
            publication,
            nationality,
            synopsis,
            image,
            resources,
            locations,
            seasons);
          // guardar
          this.#MODEL.addProduction(proCreada);
          // asignar la categoria actual la producción actual
          this.#MODEL.assignCategory(catCreada, proCreada);

          // crear y añadir todos los actores de cada produccion
          const actors = pro.actors || pro.actores || [];
          for (const act of actors) {
            const lastName = act.lastname1 ?? act.lastN ?? "";
            const bornRaw = act.born;
            const born = bornRaw instanceof Date ? bornRaw : new Date(bornRaw);
            const actCreado = this.#MODEL.createPerson(act.name, lastName, born);
            this.#MODEL.addActor(actCreado);
            // assignar a este actor la producción actual
            this.#MODEL.assignActor(actCreado, proCreada);
          }
          // crear y añadir todos los directores de cada producción
          const directors = pro.directors || pro.director || [];
          for (const dir of directors) {
            const lastName = dir.lastname1 ?? dir.lastN ?? "";
            const bornRaw = dir.born;
            const born = bornRaw instanceof Date ? bornRaw : new Date(bornRaw);
            const dirCreado = this.#MODEL.createPerson(dir.name, lastName, born);
            this.#MODEL.addDirector(dirCreado);
            // assignar a este director la producción actual
            this.#MODEL.assignDirector(dirCreado, proCreada);
          }
        }
      }


      // función para test
      // function test(model) {

      //   // mostrar estructura de datos en console.log
      //   console.log("Mostrar usuario: ");
      //   console.dir(Array.from(model.users)[0]);


      //   console.log("Mostrar estructura: ");
      //   // obtener categorias
      //   for (const cat of model.categories) {
      //     const categorias = model.getProductionsCategory(cat);
      //     console.log("-Categoria: " + cat.name);
      //     console.log("  -Producciones: ");
      //     // obtener productions de cada categoria
      //     for (const pro of categorias) {
      //       console.log("    -" + pro.title);
      //       // obtener actores de cada categoria: 
      //       const actores = model.getCast(pro);
      //       console.log("      -Actores:");
      //       for (const actor of actores) {
      //         console.log("        -" + actor.name + " " + actor.lastname1);
      //       }
      //       // en Tarea 4 no hay metodo para devolver director teniendo Producción
      //       let varDirector;
      //       //  recorrer produciones de director
      //       for (const director of model.directors) {
      //         for (const proDirector of model.getProductionsDirector(director)) {
      //           if (proDirector.title === pro.title) varDirector = director;
      //         }
      //       }
      //       console.log("      -Director: " + varDirector.name + " " + varDirector.lastname1);
      //     }
      //   }
      // }
      // // ejecutar tests
      // // test(this.#MODEL);

    } catch (e) {
      console.error(e);
    }
  };

}


// exportar clase
export default VideoSystemController;