"use strict";

class VideoSystemView {

  // Map para guardar las ventanas abiertas por clave única (p.ej. título de ficha)
  #ventanasAbiertas = new Map();
  #modalEventosVinculados = false;

  // arrays para guardar datos temporales
  #newProductionResource = [];
  #newProductionLocation = [];
  #newProductionActors = [];
  #newProductionDirectors = [];

  // arrays para asignar actores/directores
  #assignActores = [];
  #assignDirectores = [];

  constructor() {
    this.nav = document.getElementById("navID");
    this.main = document.getElementById("mainID");
    this.footer = document.getElementById("footerID");
    this.modales = document.getElementsByClassName("modalCerrar");
    this.modalContenedor = document.querySelector("#modales");
    // botones que se van a usa mucho
    this.selectCategory = document.querySelector("#selectCategory");
    this.selectActor = document.querySelector("#selectActor");
    this.selectDirector = document.querySelector("#selectDirector");
    this.btnGuardar = document.querySelector("#btnProduccionGuardar");

    this.selectBorrar = document.querySelector("#selectdeleteProduction");
    this.btnDeleteProduction = document.querySelector("#btnDeleteProduction");

    // modal asignar actor/director
    this.asignDirectorActor = document.querySelector("#asignDirectorActor");
    // select asignar Produccion
    this.selectAsignProduction = document.querySelector("#selectAsignProduction");
    // select asignar Actor
    this.selectAsignActor = document.querySelector("#selectAsignActor")
    // select asignar Director
    this.selectAsignDirector = document.querySelector("#selectAsignDirector");
    // boton assingr Guardar
    this.btnGuardarAsign = document.querySelector("#btnGuardarAsign");

    // La operación se ha completado
    this.modalMostrarResultado = document.querySelector("#modalMostrarResultado");

  }
  // metodos

  /**
   * Carga al inicio 
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   * @param {*} productions 
   */
  init(categories, directors, actors, productions) {
    this.showMenu(categories, directors, actors, directors);
    this.showCategories(categories, directors, actors, productions);
    this.showRandomProductions(productions);
    this.showFormulariosTema6();

  };

  // bind para crear eventos para Asignar actores/Directores
  bindShowAssignActores(handle) {
    try {
      this.main.addEventListener("click", (event) => {

        // evento ver Modal Asignar actor/director
        const btnAsignProduction = event.target.closest("#btnAsignProduction");
        if (!btnAsignProduction) return;
        // llamar al manejador
        handle("cargar");

      });

      // evento asign produccion
      this.selectAsignProduction.addEventListener("change", () => {
        const contenedor = document.querySelector(".actoresAsignados");
        const mostrarActoresDirectores = document.querySelector(".assignActoresDirectores");

        // datos a enviar (nombre producción)
        const datosEnviar = { produccion: this.selectAsignProduction.value, };
        // guardar actores y directores de esa produccion
        const datosRecibir = handle("casting", datosEnviar);

        // recibir datos
        const actores = datosRecibir.actores;
        const directores = datosRecibir.directores;
        // guardar en array
        this.#assignActores = actores;
        this.#assignDirectores = directores;

        // mostrar actores y directores
        mostrarActoresDirectores.classList.remove("d-none");

        // 
        // ver actores y directores
        this.#showActoresAndDirectores();
        // comprobar boton guardar
        if (!this.#checkFormValidity()) {
          contenedor.replaceChildren();
          const p = document.createElement("p");
          p.className = "text-danger";
          p.textContent = "Selecciona una Produccion y \"Añade\" al menos un actor o un director para habilitar el botón Guardar";
          contenedor.append(p);
        }
      });

      // evento asign actor
      this.selectAsignActor.addEventListener("change", (event) => {
        // comprobar boton guardar  

        if (!this.#checkFormValidity()) {
          const contenedor = document.querySelector(".actoresAsignados");
          contenedor.replaceChildren();
          const p = document.createElement("p");
          p.className = "text-danger";
          p.textContent = "Selecciona una Produccion y \"Añade\" al menos un actor o un director para habilitar el botón Guardar";
          contenedor.append(p);
        }
      });

      // boton añadir actor , para fijarme en el funcionamiento de nueva produccion y hacerlo igual
      /*
      const contenedor = document.querySelector(".resourcesSeleccionados");
      if (contenedor) {
        contenedor.replaceChildren();
        this.#newProductionResource.forEach((r, i) => {
          const span = document.createElement("span");
          // estilo etiqueta tipo capsula
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Resource ${i + 1}: ${r.duration}min - ${r.link}`;
          contenedor.append(span);
        });
      }
      this.#checkFormValidity();
      */
      const btnAddAsignActor = document.querySelector("#btnAddAsignActor");
      btnAddAsignActor.addEventListener("click", (event) => {
        event.preventDefault();
        // asignar actor
        if (this.selectAsignActor.value !== "") {
          // comprobar que no se ha seleccionado ya ese actor
          if (!this.#assignActores.includes(this.selectAsignActor.value)) {
            // añadir al array de actores asignados
            this.#assignActores.push(this.selectAsignActor.value);
          }
        }
        // ver actores y directores
        this.#showActoresAndDirectores();
      });

      // boton borrar actor
      const btnDeleteAsignActor = document.querySelector("#btnDeleteAsignActor");
      btnDeleteAsignActor.addEventListener("click", (event) => {
        event.preventDefault();
        // quitar ultimo actor
        this.#assignActores.pop();
        // ver actores y directores
        this.#showActoresAndDirectores();
      });

      // // evento asign director
      this.selectAsignDirector.addEventListener("change", (event) => {
        // comprobar boton guardar
        if (!this.#checkFormValidity()) {
          const contenedorDirector = document.querySelector(".directoresAsignados");
          contenedorDirector.replaceChildren();
          const p = document.createElement("p");
          p.className = "text-danger";
          p.textContent = "Selecciona una Produccion y \"Añade\" al menos un actor o un director para habilitar el botón Guardar";
          contenedorDirector.append(p);
        }
      });

      // // boton añadir director
      const btnAddAsignDirector = document.querySelector("#btnAddAsignDirector");
      btnAddAsignDirector.addEventListener("click", (event) => {
        event.preventDefault();
        // asignar director
        if (this.selectAsignDirector.value !== "") {
          // comprobar que no se haya seleccionado ya ese director
          if (!this.#assignDirectores.includes(this.selectAsignDirector.value)) {
            this.#assignDirectores.push(this.selectAsignDirector.value);
          }
        }
        // mostrar actores y directores
        this.#showActoresAndDirectores();

      });

      // // boton borrar director
      const btnDeleteAsignDirector = document.querySelector("#btnDeleteAsignDirector");
      btnDeleteAsignDirector.addEventListener("click", (event) => {
        // borrar ultimo director
        this.#assignDirectores.pop();
        // mostrar directores y actores
        this.#showActoresAndDirectores();
      });

      // // boton guardar asignación
      this.btnGuardarAsign.addEventListener("click", (event) => {
        event.preventDefault();

        const datos = {
          produccion: this.selectAsignProduction.value,
          actores: this.#assignActores,
          directores: this.#assignDirectores
        };

        // llamar al handle
        handle("guardar", datos);
        // resetear 
        this.#showActoresAndDirectores(true);
      });

    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  /**
   * Muestra los directores y actores que tiene una producción en el modal de Asignar Actores/Directores
   */
  #showActoresAndDirectores(resetear = false) {

    // variables
    const contenedorDirector = document.querySelector(".directoresAsignados");
    const contenedor = document.querySelector(".actoresAsignados");

    // resetear arrays y html
    if (resetear) {
      this.#assignActores = [];
      this.#assignDirectores = [];
      if (contenedorDirector) contenedorDirector.replaceChildren();

    } else {

      // mostrar los directores
      if (contenedorDirector) {
        // borrar lo que habia antes
        contenedorDirector.replaceChildren();

        this.#assignDirectores.forEach((dir, index) => {
          const span = document.createElement("span");
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Director ${index + 1}: ${dir}`;
          contenedorDirector.append(span);
        });
      }

      // mostrar los actores seleccionados
      if (contenedor) {
        contenedor.replaceChildren(); // borrar contenido anterior
        // mostrar los actores seleccionados
        this.#assignActores.forEach((actor, index) => {
          const span = document.createElement("span");
          // añade estas clases
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Actor ${index + 1}:   ${actor}`;
          contenedor.append(span);
        });
      }
    }
    // comprobar boton guardar
    this.#checkFormValidity();

  }

  /**
   * mostrar el modal para asignar a produccion Actores/directores
   * @param {*} producciones 
   * @param {*} actores 
   * @param {*} directores 
   */
  showAssignActores(producciones, actores, directores) {
    try {
      // mostrar modal para asignar actores
      this.asignDirectorActor.classList.remove("d-none");
      this.asignDirectorActor.classList.add("d-block");

      // select Producciones
      // resetear productions
      this.selectAsignProduction.replaceChildren();
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "--Selecciona Produccion--";
      option.disabled = true;
      option.selected = true;
      this.selectAsignProduction.append(option);

      // rellenar producions
      producciones.forEach(p => {
        const option = document.createElement("option");
        option.value = p.title;
        option.textContent = p.title;
        this.selectAsignProduction.append(option);
      });

      // select para actores
      // resetear Productions
      this.selectAsignActor.replaceChildren();
      const optionActor = document.createElement("option");
      optionActor.value = "";
      optionActor.textContent = "--Selecciona Actor--";
      optionActor.disabled = true;
      optionActor.selected = true;
      this.selectAsignActor.append(optionActor);

      // rellenar actors
      actores.forEach(a => {
        const option = document.createElement("option");
        option.value = `${a.name}_${a.lastname1}`;
        option.textContent = `${a.name} ${a.lastname1}`;
        this.selectAsignActor.append(option);
      });

      // select para directores
      this.selectAsignDirector.replaceChildren();
      const optionDirector = document.createElement("option");
      optionDirector.value = "";
      optionDirector.textContent = "--Selecciona Director--";
      optionDirector.disabled = true;
      optionDirector.selected = true;
      this.selectAsignDirector.append(optionDirector);

      // rellenar directores
      directores.forEach(d => {
        const option = document.createElement("option");
        option.value = `${d.name}_${d.lastname1}`;
        option.textContent = `${d.name} ${d.lastname1}`;
        this.selectAsignDirector.append(option);
      });



    } catch (e) {
      this.showResultadoModal("mostrar", `Ha ocurrido un error: ` + e);
    }
  }

  // bind showDeleteProductionModal
  bindShowDeleteProductionModal(handle) {
    try {
      // crear evento click llama a > al manejador>llama a showDeleteProductionModal
      this.main.addEventListener("click", (event) => {
        const btnDeleteProduction = event.target.closest("#removeProduction");
        if (!btnDeleteProduction) return;
        // llamar al manejador
        handle("cargar");
      });

      // al selecciona una producción ver su imagen
      this.selectBorrar.addEventListener("change", (event) => {
        // ver imagen de la producción
        if (event.target.value !== "") {
          handle("verImagen", event.target.value);
        }
      });

      // boton borrar producción
      this.btnDeleteProduction.addEventListener("click", (event) => {
        event.preventDefault();
        if (this.selectBorrar.value !== "") {
          const seleccion = this.selectBorrar.value;
          const confirmar = window.confirm(`¿Seguro que quieres borrar la producción \"${seleccion}\"?`);
          if (confirmar) {
            handle("borrar", seleccion);
          }
        }
      });

    } catch (e) {
      this.showResultadoModal("mostrar", `Ha ocurrido un error: ` + e);
    }
  }


  // Mostrar Modal DeleteProduction
  showDeleteProductionModal(productions, imagenSeleccionada = "") {
    try {
      const modalDelete = document.querySelector("#deleteProduction");
      const divImagenProduccion = document.querySelector(".imagen-produccion");
      const productionsArray = Array.from(productions || []);
      // mostrar modal
      modalDelete.classList.remove("d-none");
      modalDelete.classList.add("d-block");

      // limpiar imagen anterior al volver a pintar
      if (divImagenProduccion) {
        divImagenProduccion.replaceChildren();
      }

      // llenar option
      // resetear option
      this.selectBorrar.replaceChildren();
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "--Selecciona Producción--";
      option.disabled = true;
      option.selected = true;
      this.selectBorrar.append(option);

      // si hay datos
      if (productionsArray.length > 0) {

        // llenar select con las producciones
        productionsArray.forEach(e => {
          const option = document.createElement("option");
          option.value = e.title;
          option.textContent = e.title;
          if (e.title === imagenSeleccionada) {
            option.selected = true;
          }
          this.selectBorrar.append(option);
        });
      }

      // cambiar imagen produccion
      if (imagenSeleccionada !== "") {
        // buscar la imagen
        productionsArray.forEach(p => {
          if (p.title === imagenSeleccionada) {
            const imagenProduccion = new Image();
            imagenProduccion.alt = "Imagen Producción";
            imagenProduccion.width = 200;
            imagenProduccion.src = `https://placehold.co/200x300/grey/white?text=${p.image}`;
            // insertar imagen en el divImagenProducción
            divImagenProduccion.append(imagenProduccion);
          }
        });
      }

    } catch (e) {
      this.showResultadoModal("mostrar", `Ha ocurrido un error: ` + e);
    }
  }

  // guardar nueva producción
  bindSaveProduction(handle) {
    try {
      this.btnGuardar.addEventListener("click", (event) => {
        event.preventDefault();
        const datos = {
          categoria: document.querySelector("#selectCategory")?.value,
          tipo: document.querySelector("#selectPeliculaSerie")?.value,
          titulo: document.querySelector("#titulo")?.value,
          nacionalidad: document.querySelector("#nationality")?.value,
          publication: document.querySelector("#publication")?.value,
          synopsis: document.querySelector("#synopsis")?.value,
          imageName: document.querySelector("#image")?.files[0]?.name || null,
          seasons: document.querySelector("#seasons")?.value || 0,
          resources: this.#newProductionResource,
          locations: this.#newProductionLocation,
          actores: this.#newProductionActors,
          directores: this.#newProductionDirectors
        };
        console.log("Nueva Producción -Vista-: ");
        console.dir(datos);
        handle(datos);
        // this.closeAllModals();
      });

    } catch (e) {
      this.showResultadoModal("mostrar", `Ha ocurrido un error: ` + e);
    }
  }


  /**
   * Muestra un modal con la información
   * @param {*} estado si es "mostrar" muestra el modal, si es "ocultar" lo oculta
   * @param {*} mensaje  muestra un mensaje tiene que estar en html
   */
  showResultadoModal(estado, mensaje = "") {
    const mens = this.modalMostrarResultado.querySelector(".modal-contenido .resultado");
    mens.replaceChildren();
    switch (estado) {
      case "mostrar":
        if (mens) mens.insertAdjacentHTML('beforeend', mensaje);
        this.modalMostrarResultado.classList.remove("d-none");
        break;
      case "ocultar":
        this.modalMostrarResultado.classList.add("d-none");
        break;
      default:
        break;
    }
  }

  /**
   * 
   * @param {*} handle 
   */
  bindShowModal(handle) {
    this.bindCloseModal();

    // evento nuevaProduccion: abrir modal al pulsar el botón
    this.main.addEventListener("click", (event) => {
      const btnNewProduction = event.target.closest("#addProduction");
      if (!btnNewProduction) return;
      handle("categorias");
    });

    // listener del select de categoría 
    if (this.selectCategory) {
      this.selectCategory.addEventListener("change", (event) => {
        if (event.target.value !== "") {
          console.log(`Categoria Seleccionada: ${event.target.value}`);
          event.target.setCustomValidity("");
          this.showModal("dosProduction");
        } else {
          event.target.setCustomValidity("Debe elegir una Categoria");
        }
        this.#checkFormValidity();
      });
    }

    // listener campos titulo, publication y seasons
    this.modalContenedor.addEventListener("input", (event) => {
      const campo = event.target.closest("#titulo, #publication, #seasons");
      if (!campo) return;
      this.#checkFormValidity();
    });

    // listener del select de pelicula o Serie 
    this.modalContenedor.addEventListener("change", (event) => {
      const selectPeliculaSerie = event.target.closest("#selectPeliculaSerie");
      if (!selectPeliculaSerie) return;
      if (selectPeliculaSerie.value !== "") {
        // valido
        selectPeliculaSerie.setCustomValidity("");
        console.log(`Tipo seleccionado: ${selectPeliculaSerie.value}`);
        // mostrar siguiente secuencia del fomulario de nueva Producción y cargar los actores y directores
        handle("actoresDirectores");

        // si se selecciona Serie tiene que aparecer cuadroProduccion para ver temporadas
        if (selectPeliculaSerie.value === "SE") {
          this.showModal("cuatroProduction");
        } else {
          // ocultar cuadroProduction si se elige Pelicula
          const cuatro = document.querySelector("#modalCuatro");
          if (cuatro) {
            cuatro.classList.remove("d-block");
            cuatro.classList.add("d-none");
          }
        }
      } else {
        // no valido
        selectPeliculaSerie.setCustomValidity("Debe elegir Si es Pelicula o Serie");
      }
      this.#checkFormValidity();
      const selectActor = event.target.closest("#selectActor");
      if (!selectActor) return;
      if (selectActor.value !== "") {
        // valido
        selectActor.setCustomValidity("");
      } else {
        selectActor.setCustomValidity("Debe elegir al menos un actor");
      }
    });

    // Select Director
    this.modalContenedor.addEventListener("change", (event) => {
      const selectDirector = event.target.closest("#selectDirector");
      if (!selectDirector) return;
      if (selectDirector.value !== "") {
        // valido
        selectDirector.setCustomValidity("");
      } else {
        selectDirector.setCustomValidity("Debe elegir un Director");
      }
    });


    // boton añadir resource
    this.modalContenedor.addEventListener("click", (event) => {
      const addResource = event.target.closest("#btnAddResource");
      if (!addResource) return;
      event.preventDefault();

      // guardar duracion y link, tiene que estar los dos, 
      // si es null el operador de encadenamiento opcional ? arregla poblemas que pueda haber 
      const duration = Number.parseInt(document.querySelector("#duration")?.value || 0); // convertir a int
      const link = document.querySelector("#link")?.value;
      if (!duration && !link) return;

      // saber si es pelicula o Serie, 
      // Si es pelicula solo guarda un Resource, si es serie guarda un array de resources
      const tipo = document.querySelector("#selectPeliculaSerie")?.value;
      const resource = { duration, link };

      // si es pelicula solo puede haber un resource, guarda en array #newProductionResource
      if (tipo === "MO") {
        this.#newProductionResource = [resource];
      } else {
        // si es serie añadir al array
        this.#newProductionResource.push(resource);
      }

      // mostrar los resources seleccionados
      const contenedor = document.querySelector(".resourcesSeleccionados");
      if (contenedor) {
        contenedor.replaceChildren();
        this.#newProductionResource.forEach((r, i) => {
          const span = document.createElement("span");
          // estilo etiqueta tipo capsula
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Resource ${i + 1}: ${r.duration}min - ${r.link}`;
          contenedor.append(span);
        });
      }
      this.#checkFormValidity();
    });

    // boton borrar resource
    this.modalContenedor.addEventListener("click", (event) => {
      const deleteResource = event.target.closest("#btnDeleteResource");
      if (!deleteResource) return;
      event.preventDefault();
      // vaciar array
      this.#newProductionResource = [];
      const contenedor = document.querySelector(".resourcesSeleccionados");
      // quitar del html
      if (contenedor) contenedor.replaceChildren();
      this.#checkFormValidity();
    });

    // boton añadir location
    this.modalContenedor.addEventListener("click", (event) => {
      const addLocation = event.target.closest("#btnAddLocation");
      if (!addLocation) return;
      event.preventDefault();

      // Guardar locations en array #newProductionLocation
      const latitude = Number.parseFloat(document.querySelector("#latitude")?.value || 0); // tipo float
      const longitude = Number.parseFloat(document.querySelector("#longitude")?.value || 0); // tipo float
      if (!latitude && !longitude) return;
      // guardar en objeto
      const location = { latitude, longitude };

      // añadir al array
      this.#newProductionLocation.push(location);

      // mostrar las locations
      const contenedor = document.querySelector(".locationsSeleccionadas");
      if (contenedor) {
        contenedor.replaceChildren();// borrar contenido anterior
        this.#newProductionLocation.forEach((location, index) => {
          const span = document.createElement("span");
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Location ${index + 1}: Latitude ${location.latitude}º , Longitude ${location.longitude}º`;
          contenedor.append(span);
        });
      }
    });

    // boton borrar location
    this.modalContenedor.addEventListener("click", (event) => {
      const deleteLocation = event.target.closest("#btnDeleteLocation");
      if (!deleteLocation) return;
      event.preventDefault();
      // vaciar array
      this.#newProductionLocation = [];
      const contenedor = document.querySelector(".locationsSeleccionadas");
      // quitar del html
      if (contenedor) contenedor.replaceChildren();
    });

    // boton select actores 
    this.modalContenedor.addEventListener("click", (event) => {
      const btnAddActores = event.target.closest("#btnAddActores");
      if (!btnAddActores) return;
      event.preventDefault();

      // guardar actores en array #newProductionActors
      const selectActor = document.querySelector("#selectActor");
      const clave = selectActor.value; // clave 
      const nombre = selectActor.options[selectActor.selectedIndex].text; // nombre visible

      if (clave === "") return; // si no se ha seleccionado nada salir
      // si ya existe el actor no añadir
      const existeActor = this.#newProductionActors.some((actor) => actor.clave === clave);
      if (existeActor) return;

      const actorSeleccionado = { clave, nombre };

      // añadir al array
      this.#newProductionActors.push(actorSeleccionado);

      // mostrar los actores seleccionados
      const contenedor = document.querySelector(".actoresSeleccionados");
      if (contenedor) {
        contenedor.replaceChildren(); // borrar contenido anterior
        // mostrar los actores seleccionados
        this.#newProductionActors.forEach((actor, index) => {
          const span = document.createElement("span");
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Actor ${index + 1}:   ${actor.nombre}`;
          contenedor.append(span);
        });
      }
      this.#checkFormValidity();
    });

    // boton borrar actores
    this.modalContenedor.addEventListener("click", (event) => {
      const btnDeleteActores = event.target.closest("#btnDeleteActores");
      if (!btnDeleteActores) return;
      event.preventDefault();
      // vaciar array
      this.#newProductionActors = [];
      const contenedor = document.querySelector(".actoresSeleccionados");
      // limpiar del html
      if (contenedor) contenedor.replaceChildren();
      this.#checkFormValidity();
    });

    // boton select director 
    this.modalContenedor.addEventListener("click", (event) => {
      const btnAddDirectores = event.target.closest("#btnAddDirector");
      if (!btnAddDirectores) return;
      event.preventDefault();

      const selectDirector = document.querySelector("#selectDirector");
      if (!selectDirector) return;

      const clave = selectDirector.value;
      console.log(`Director Seleccionado: ${clave}`);
      if (clave === "") return;

      const nombre = selectDirector.options[selectDirector.selectedIndex].text;
      const existeDirector = this.#newProductionDirectors.some((director) => director.clave === clave);
      if (existeDirector) return;
      // guardar objeto 
      const directorSeleccionado = { clave, nombre };
      this.#newProductionDirectors.push(directorSeleccionado);

      const contenedor = document.querySelector(".directoresSeleccionados");
      if (contenedor) {
        contenedor.replaceChildren();
        this.#newProductionDirectors.forEach((director, index) => {
          const span = document.createElement("span");
          span.className = "badge bg-secondary me-1 mt-1";
          span.textContent = `Director ${index + 1}: ${director.nombre}`;
          contenedor.append(span);
        });
      }
      this.#checkFormValidity();
    });

    // boton borrar director
    this.modalContenedor.addEventListener("click", (event) => {
      const btnDeleteDirector = event.target.closest("#btnDeleteDirector");
      if (!btnDeleteDirector) return;
      event.preventDefault();
      // vaciar array
      this.#newProductionDirectors = [];
      const contenedor = document.querySelector(".directoresSeleccionados");
      // limpiar html
      if (contenedor) contenedor.replaceChildren();
      this.#checkFormValidity();
    });

  }

  /**
   * Comprueba los campos obligatorios si todo ok habilita el botón Guardar
   */
  #checkFormValidity() {

    const categoria = document.querySelector("#selectCategory")?.value;
    const tipo = document.querySelector("#selectPeliculaSerie")?.value;
    const titulo = document.querySelector("#titulo")?.value.trim();
    const publication = document.querySelector("#publication")?.value;

    // convertir a booleanos
    const categoriaOk = !!categoria;
    const tipoOk = !!tipo;
    const tituloOk = !!titulo;
    const publicationOk = !!publication;

    // validar formulario assign Actores/Directores
    const selectAsignProduction = document.querySelector("#selectAsignProduction")?.value;

    // si es serie
    let seasonsOk = true;
    if (tipo === "SE") {
      const seasons = document.querySelector("#seasons")?.value;
      seasonsOk = !!seasons;
    }

    // habilita botón Guardar si los campos obligatorios son validos
    const valido = categoriaOk && tipoOk && tituloOk && publicationOk;

    this.btnGuardar.disabled = !valido;


    // habilitar boton guardar si se ha seleccionado una producción y al menos un actor o un director
    if (selectAsignProduction && (this.#assignActores.length > 0 || this.#assignDirectores.length > 0)) {
      this.btnGuardarAsign.disabled = false;
      // devolver true para validar
      return true;
    } else {
      this.btnGuardarAsign.disabled = true;
      // devolder false para no validar
      return false;
    }
  }

  /**
   * ocultar los modales
   */
  closeAllModals() {
    const modales = document.querySelectorAll(".modalContenedor, .modalCerrar");
    modales.forEach((modal) => {
      modal.classList.remove("d-block");
      modal.classList.add("d-none");
    });

    // resetear select pelicula o serie
    const selectPeliculaSerie = document.querySelector("#selectPeliculaSerie");
    if (selectPeliculaSerie) selectPeliculaSerie.value = "";
  }

  /**
   * crear eventos para poder cerrar los modales
   * @returns 
   */
  bindCloseModal() {
    if (this.#modalEventosVinculados || !this.modales) return;
    this.#modalEventosVinculados = true;

    this.modalContenedor.addEventListener("click", (event) => {
      // boton cerrar
      const btnCerrar = event.target.closest(".btnCerrar");
      if (btnCerrar) {
        this.closeAllModals();
        return;
      }

      // boton cancelar
      const cancelar = event.target.closest("#btnCancelar");
      if (cancelar) {
        event.preventDefault();
        this.closeAllModals();
        return;
      }


      // click fuera del modal
      const clickFuera = event.target.classList.contains("modalContenedor");
      if (clickFuera) {
        this.closeAllModals();
      }

    });
  }


  /**
   * mostrar Formulario de añadir Production
   */
  showModal(formulario, categorias = [], actores = [], directores = []) {



    // mostrar modal y sus secciones
    // 
    const showAddProduction = document.querySelector("#modalAddProduction");

    // mostrar modal Produccion por secciones
    const dosProduction = document.querySelector("#modalDos");
    const tresProduction = document.querySelector("#modalTres");
    const cuatroProduction = document.querySelector("#modalCuatro");

    switch (formulario) {
      case "produccion":

        showAddProduction.classList.remove("d-none");
        showAddProduction.classList.add("d-block");
        // deshabilitar boton Guardar hasta que se valide el formulario
        this.btnGuardar.disabled = true;

        // cargar categorias dinamicamente
        // usar el value la clave de la categoria

        // resetear select
        this.selectCategory.replaceChildren();

        const mensaje = document.createElement("option");
        mensaje.value = "";
        mensaje.textContent = "--Selecciona Categoria--";
        mensaje.disabled = true;
        mensaje.selected = true;
        this.selectCategory.append(mensaje);

        // crear select con las Categorias
        categorias.forEach(e => {
          const hijo = document.createElement("option");
          hijo.value = e.name || "";
          hijo.textContent = e.name || "";
          // añadir hijo
          this.selectCategory.append(hijo);
        });

        break;



      // mostrar select Peliculas o Serie
      case "dosProduction":
        // mostrar modalUno
        dosProduction.classList.remove("d-none");
        dosProduction.classList.add("d-block");
        break;

      // mostrar siguiente secuencia del modal
      case "tresProduction":
        // mostrar modaltres
        tresProduction.classList.remove("d-none");
        tresProduction.classList.add("d-block");

        // resetear los select actores
        this.selectActor.replaceChildren();
        const placeholderActor = document.createElement("option");
        placeholderActor.value = "";
        placeholderActor.textContent = "--Selecciona Actor--";
        placeholderActor.disabled = true;
        placeholderActor.selected = true;
        this.selectActor.append(placeholderActor);

        // crear los options de actores
        actores.forEach(a => {
          const option = document.createElement("option");
          option.value = `${a.name}_${a.lastname1}`;
          option.textContent = `${a.name} ${a.lastname1}`;
          this.selectActor.append(option);
        });

        // resetear Select Directores
        this.selectDirector.replaceChildren();
        const placeholderDirector = document.createElement("option");
        placeholderDirector.value = "";
        placeholderDirector.textContent = "--Selecciona Director--";
        placeholderDirector.disabled = true;
        placeholderDirector.selected = true;
        this.selectDirector.append(placeholderDirector);

        // añadir los options de directores
        directores.forEach(d => {
          const option = document.createElement("option");
          option.value = `${d.name}_${d.lastname1}`;
          option.textContent = `${d.name} ${d.lastname1}`;
          this.selectDirector.append(option);
        });
        break;

      // mostrar temporadas (solo Series)
      case "cuatroProduction":
        cuatroProduction.classList.remove("d-none");
        cuatroProduction.classList.add("d-block");
        break;
    }

  }

  /**
   * mostrar tres botones para abrir los tres formularios
   * 
   */
  showFormulariosTema6() {
    let html = "";

    html += `
    <div class="container my-2 p-4 bg-dark rounded">
    <div class="row g-4 justify-content-center">

      <div class="col-12 col-md-6 text-center">
        <h6 class="mb-3 text-white">Crear Nueva Producción</h6>
        <div class="d-grid">
          <button id="addProduction" class="btn btn-success py-3">
            Crear Nueva Producción
          </button>
        </div>
      </div>

      <div class="col-12 col-md-6 text-center">
        <h6 class="mb-3 text-white">Borrar Producción</h6>
        <div class="d-grid">
          <button id="removeProduction" class="btn btn-danger py-3">
            Borrar Producción
          </button>
        </div>
      </div>

      <div class="col-12 col-md-12 text-center">
        <h6 class="mb-3 text-white">Asignar Actores/Directores a Producción</h6>
        <div class="d-grid">
          <button id="btnAsignProduction" class="btn btn-success py-3">
            Asignar Actores/Directores
          </button>
        </div>
      </div>
    </div>


    <div class="text-center mt-2">
      <!-- github -->
      <img src="./img/github.png" alt="github" width="40">
      <a href="https://github.com/artxta/DWEC06" target="_blank" class="text-white fs-4">
        Ver proyecto en GitHub
      </a>
    </div>
  </div>
    `;

    // insertar este html antes del final
    this.main.insertAdjacentHTML('beforeend', html);


  }

  /**
   * manejador para abrir nueva ventana
   * @param {*} handler 
   */
  bindNewWindow(handler) {
    // crear evento en el main
    this.main.addEventListener("click", (event) => {
      // busca el botón para abrir en nueva ventana
      const boton = event.target.closest(".newVentana");
      if (!boton) return; // si no existe continuar la ejecución
      event.preventDefault();

      // guarda el tipo y la clave del boton
      // se accede a través de dataset, y dataset convierte los nombres con guiones a camelCase.
      const tipo = boton.dataset.windowType; // data-window-type en camelCase
      const key = boton.dataset.key;
      if (!tipo || !key) return; // si no es ninguno de los dos continuar ejecución

      const datos = handler(tipo, key);
      if (!datos) return;

      // ejecutar nueva ventana según el tipo.

      // ficha produccion
      if (tipo === "production") {
        this.showMyWindow(
          this.showFichaProduction(datos.produccion, datos.actores, datos.directores, true),
          // para que no se abran dos ventanas iguales
          datos.popupKey // identificar la ventana abierta
        );
        return;
      }

      // ficha actor
      if (tipo === "actor") {
        this.showMyWindow(
          this.showFichaActor(datos.actor, datos.productions, true),
          // para que no se abran dos ventanas iguales
          datos.popupKey // identificar la ventana abierta
        );
        return;
      }

      // ficha director
      if (tipo === "director") {
        this.showMyWindow(
          this.showFichaDirector(datos.director, datos.productions, true),
          // para que no se abran dos ventanas iguales
          datos.popupKey // identificar la ventana abierta
        );
      }
    });
  }

  /**
   * muestra el Menu principal
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   * @param {*} productions 
   */
  showMenu(categories, directors, actors, productions) {
    // mostrar menú
    let html = "";
    //  borra el contenido del nav
    this.nav.replaceChildren();

    html = `
<div class="container-fluid">

  <a id="inicio" class="navbar-brand" href="#">
    <img class="navbar-brand"  src="./img/logo.png" alt="Logo" height="40" class="d-inline-block align-text-top">
    Inicio
  </a>

  <!-- Botón hamburguesa (para pantallas pequeñas) -->
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
    <span class="navbar-toggler-icon"></span>
  </button>

      
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">`;

    // Insertar Categorias, Actores, Directores, etc en un dropdown
    html += `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categorías
        </a>
        <ul class="dropdown-menu">`;
    for (const cat of categories) { // clase categoria
      html += `
          <li class="categoria"><a class="dropdown-item category-link" title="${cat.description}" href="#">${cat.name}</a></li>`;
    }


    html += `
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
        Directores
        </a>
        <ul class="dropdown-menu">`;


    //  insertar directores en el menú
    for (const director of directors) {
      html += `
          <li class="director"><a class="dropdown-item" href="#" data-key="${director.name + "_" + director.lastname1}">${director.name + " " + director.lastname1}</a></li>`;
    }

    html += `
        </ul>
      </li>

          
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
        Actores
        </a>
        <ul class="dropdown-menu">`;

    // Insertar Actores en el menú
    for (const actor of actors) {
      html += `
          <li class="actor"><a class="dropdown-item " href="#" data-key="${actor.name + "_" + actor.lastname1}">${actor.name + " " + actor.lastname1}</a></li>`;

    }

    html += `
        </ul>
      </li>

    <!-- Boton para Cerrar Todas las Ventanas -->
    <button id="btnCerrarVentanas" class="btn btn-outline-danger">Cerrar Todas las Ventanas</button>
    
    </ul>



  </div>
</div>
    `;

    // insertar en el html antes del final
    this.nav.insertAdjacentHTML("beforeend", html);

  }

  /**
   * Muestra las Categorias y las producciones
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   * @param {*} productions 
   */
  showCategories(categories, directors, actors, productions) {
    // ver zona central Categorias

    // Borrar lo que habia antes 
    this.main.replaceChildren();

    // Mostrar categorias en el centro
    let html = "";
    html = `
    <div class="container">
    <h3 class="mb-2">Categorías:</h3>
    <div class="row justify-content-center">
    `;

    console.log("Mostrar Categorias en Vista:");
    for (const categoria of categories) { // clase categoria
      html += `
      <div class="col-6 mb-4 categoria"> 
      <a href="#" class="btn btn-primary btn-lg w-100 py-2" title="${categoria.description}" >${categoria.name}</a>
      </div>
      `;
      //  console.log(categoria.name);
    }
    html += `
    </div>
    </div>
    `;

    this.main.insertAdjacentHTML('beforeend', html);


  }

  /**
   * Muestra 3 producciones de forma aleatoria
   * @param {*} productions 
   */
  showRandomProductions(productions) {
    // generar Producciones aleatorias y las añade a la vista
    let html = "";
    html = `
    <div class="container">
      <h3 class="mb-2">3 Producciones Aleatorias:</h3>
      <div class="row justify-content-center">
    `;

    console.log("Mostrar 3 producciones aleatorias:");

    // guarda las producciones aleatorias
    const randomProductions = Array.from(this.getRandomProductions(productions, 3));
    for (const produccion of randomProductions) {
      html += `
      <div class="col-6 mb-4 produccion" data-key="${produccion.title}">
      <a href="#" class="btn btn-primary btn-lg w-100 py-2" title="${produccion.synopsis}">${produccion.title}</a>
      </div>
      `;
      //  console.log(produccion.title);
    }

    html += `
    </div>
      </div>
    `;

    this.main.insertAdjacentHTML('beforeend', html);
  }

  /**
   * recibe un array de producciones y los muestra en la vista principal
   * @param {*} category 
   */
  listProductions(productions, nombreCategoria) {
    // ver zona central Categorias

    // Borrar lo que habia antes 
    this.main.replaceChildren();

    // Mostrar producciones en el centro
    let html = "";
    html = `
    <div class="container">
    <h3 class="mb-2">Producciones de ${nombreCategoria}:</h3>
    <div class="row justify-content-center">
    `;

    // console.log("Mostrar Producciones de la Categoria:");
    for (const pro of productions) {
      html += `
      <div class="col-6 mb-4 produccion" data-key="${pro.title}">
      <a href="#" class="btn btn-primary btn-lg w-100 py-2" title="${pro.synopsis}">${pro.title}</a>
      </div>
      `;
      // console.log(pro.title);
    }
    html += `
    </div>
    </div>
    `;

    this.main.insertAdjacentHTML('beforeend', html);

  }


  /**
   * enlazador para ver las producciones al clickar en una categoria
   * @param {*} handlet 
   */
  bindGetProductionsInCategory(handlet) {
    // como no existe la categoria en html, se delega al padre main
    this.main.addEventListener("click", (event) => {
      // buscar la clase categoria
      const cat = event.target.closest(".categoria");
      if (!cat) {// si no existe continuar la ejecución
        return;
      }
      event.preventDefault();
      // obtener el nombre de la categoria desde el enlace "a"
      const nombreCat = cat.querySelector("a").textContent;
      console.log("evento añadido a categoria: " + nombreCat);

      // ejecutar listProductions, handlet();
      this.listProductions(handlet(nombreCat), nombreCat);
    });
    //  lo mismo pero en la navegación
    this.nav.addEventListener("click", (event) => {
      // buscar la clase categoria
      const cat = event.target.closest(".categoria");
      if (!cat) {// si no existe continuar la ejecución

        return;
      }
      event.preventDefault();
      // obtener el nombre de la categoria desde el enlace "a"
      const nombreCat = cat.querySelector("a").textContent;
      console.log("evento añadido a categoria: " + nombreCat);

      // ejecutar listProductions, handlet();
      this.listProductions(handlet(nombreCat), nombreCat);
    });
  }

  /**
   * 
   * @param {*} production 
   * @param {*} actors 
   * @param {*} directors 
   * @param {*} isVentana si es false muestra botón para abrir en nueva ventana
   */
  showFichaProduction(production, actors, directors, isVentana = false) {
    // ver ficha produccion
    // ver todos los campos de la produccion y los actores y directores que intervienen en la producción
    // #title;
    // #nationality;
    // #publication;
    // #synopsis;
    // #image;

    try {



      // Borrar lo que habia antes 
      if (!isVentana) this.main.replaceChildren();

      // Mostrar producciones en el centro
      let html = "";
      html = `
       <div class="card shadow-lg">
        <div class="row g-0">`;

      // botón para abrir en nueva ventana, se envia directamente, la produccion, actores, y directores 
      // cambiar los objetos por claves, los objetos me causan problemas en el history
      if (!isVentana) {
        html += `<button class="btn btn-outline-success mb-3 newVentana"
            data-window-type="production" data-key="${production.title}"
          >Mostrar en nueva ventana</button>`;

      }

      html += `<div class="col-md-4">
            <img src="https://placehold.co/400x600/grey/white?text=${production.image}"
              class="img-fluid rounded-start h-100 object-fit-cover" alt="Imagen producción">
          </div>
  
          <div class="col-md-8">
            <div class="card-body">
  
              <h2 class="card-title">${production.title}</h2>
  
              <p class="card-text">
                <strong>Nacionalidad: </strong>${production.nationality}
              </p>
  
              <p class="card-text">
  
              <!--  problema con las fechas, pushState las convierte a strings al serializar -->
                <strong>Fecha de publicación: </strong>${production.publication.toLocaleDateString()}
              </p>
  
              <p class="card-text">
                <strong>Sinopsis: </strong>${production.synopsis}
              </p>`;

      // si tiene capitulos mostrarlos
      if (production.seasons) {
        html += `<!-- capitulos -->
              <p class="card-text">
                <strong>Capitulos: </string>${production.seasons}
              </p>`;
      }

      html += `<hr>
  
              <!-- Actores -->
              <h4>Actores:</h4>
              <div class="row">`;

      // mostrar actores
      for (const actor of actors) {
        html += `<div class="col-md-4 text-center mb-3 actor">
                  <a href="#" data-key="${actor.name + "_" + actor.lastname1}" class="text-decoration-none">
                    <p class="mb-0">${actor.name + " " + actor.lastname1}</p>
                  </a>
                </div>`;
      }

      html += `</div>
  
              <hr>
  
              <!-- Directores -->
              <h4>Directores:</h4>
              <div class="row">`;

      // mostrar directores
      for (const dir of directors) {
        html += `<div class="col-md-4 text-center mb-3 director">
                  <a href="#" data-key="${dir.name + "_" + dir.lastname1}" class="text-decoration-none">
                    <p class="mb-0">${dir.name + " " + dir.lastname1}</p>
                  </a>
                </div>`;
      }

      // mostrar locations
      if (production.locations && production.locations.length > 0) {
        html += `<hr>
                <h4>Locations:</h4>
                <div class="row">`;

        production.locations.forEach((loc, index) => {
          html += `<div class="col-md-4 text-center mb-3">
                    <p class="mb-0">Location ${index + 1}: Latitude ${loc.latitude}º , Longitude ${loc.longitude}º</p>
                  </div>`;
        });
      }

      // mostrar resource
      // mostrar detalles producción
      // console.warn("Detalles de la producción:");
      // console.dir(production);
      // si tiene resource mostrarlos
      if (production.resource && production.resource.length > 0) {
        html += `<hr>
                <h4>Resources:</h4>
                <div class="row">`;

        production.resource.forEach((res, index) => {
          html += `<div class="col-md-4 text-center mb-3">
                    <p class="mb-0">Resource ${index + 1}: Duration ${res.duration}min , Link: ${res.link}</p>
                  </div>`;
        });
      }

      html += `</div>
  
            </div>
          </div>
  
        </div>
      </div>
      `;

      // si se utiliza para mostrar en la pagina principal dibuja la ficha allí, sino, devuelve el html para la nueva ventana
      if (!isVentana) {
        this.main.insertAdjacentHTML('beforeend', html);
      } else {
        return html;
      }
    } catch (e) {
      console.error(e);
    }



  }

  // enlace para el evento que muestra la ficha de la pelicula
  bindShowFichaProduction(handler) {
    //  se delega el evento al padre
    this.main.addEventListener("click", (event) => {
      const produccion = event.target.closest(".produccion");
      if (!produccion) return;
      event.preventDefault();

      // buscar el enlace de la produccion y guardar titulo
      const nombreProduccion = produccion.dataset.key;
      console.log("Evento añadido a produccion: " + nombreProduccion);
      // añadir handler
      // como necesito el objeto produccion y los actors y directores , lo añado en un objeto
      const datos = handler(nombreProduccion);
      this.showFichaProduction(datos.produccion, datos.actores, datos.directores);
    });


  }

  /**
   * Muestra la ficha del Actor, y de las peliculas que ha participado
   * @param {*} actor 
   * @param {*} productions 
   */
  showFichaActor(actor, productions, isVentana = false) {
    /*
     #name;
      #lastname1;
      #lastname2;
      #born;
      #picture;
    */
    let html = "";
    if (!isVentana) this.main.replaceChildren();


    html += `
   <div class="card shadow-lg">
      <div class="row g-0">`;

    // Botón que mostrar si no es ventana
    if (!isVentana) {
      html += `<button class="btn btn-outline-success mb-3 newVentana"
       data-window-type="actor" data-key="${actor.name}_${actor.lastname1}">Mostrar en nueva ventana</button>`;
    }



    // Foto del actor
    html += `<div class="col-md-4">
          <img src="https://placehold.co/400x500?text=Foto+Actor" class="img-fluid rounded-start h-100 object-fit-cover"
            alt="Foto actor">
        </div>

        <!-- Información -->
        <div class="col-md-8">
          <div class="card-body">

            <h2 class="card-title">
              ${actor.name + " " + actor.lastname1 + " " + actor.lastname2}
            </h2>

            <p class="card-text">
              <strong>Fecha de nacimiento: </strong> ${actor.born.toLocaleDateString()}
            </p>

            <hr>

            <!-- Producciones -->
            <h4>Producciones: </h4>

            <div class="row">`;

    // mostrar producciones

    for (const pro of productions) {
      html += `
    <div class="col-md-4 mb-4">
      <a href="#" class="produccion" data-key="${pro.title}">
        <div class="card h-100">
          <img src="https://placehold.co/300x400?text=${pro.image}" class="card-img-top" alt="Produccion">
          <div class="card-body">
            <h6 class="card-title">${pro.title}</h6>
          </div>
        </div>
      </a>
    </div>
              `;
    }
    html += `</div>

          </div>
        </div>

      </div>
    </div>
   `;

    if (!isVentana) {

      this.main.insertAdjacentHTML('beforeend', html);
    } else {
      return html;
    }

  }

  /**
   * enlazar el evento para mostrar Ficha Actor
   * @param {*} handler 
   */
  bindShowFichaActor(handler) {
    // escuchar en el nav (donde están los actores en el dropdown)
    this.nav.addEventListener("click", (event) => {
      // clase actor
      const actor = event.target.closest(".actor");
      if (!actor) return; // si no se crea continuar
      event.preventDefault();
      // guardar la key del actor, desde atributo personalizado
      const keyActor = actor.querySelector("a").dataset.key;
      // obtener el objeto actor y el array de producciones del actor
      const datos = handler(keyActor);
      // ejecutar función
      console.log("showActor: " + datos.actor);
      this.showFichaActor(datos.actor, datos.productions);

    });
    // escuchar también en el main 
    this.main.addEventListener("click", (event) => {
      // clase actor
      const actor = event.target.closest(".actor");
      if (!actor) return; // si no se crea continuar
      event.preventDefault();
      // guardar la key del actor, desde atributo personalizado
      const keyActor = actor.querySelector("a").dataset.key;
      // obtener el objeto actor y el array de producciones del actor
      const datos = handler(keyActor);
      // ejecutar función
      console.log("showActor: " + datos.actor);
      this.showFichaActor(datos.actor, datos.productions);

    });
  }

  /**
   * Muestra la ficha del Actor y de las peliculas que ha participado
   * @param {*} director 
   * @param {*} productions 
   */
  showFichaDirector(director, productions, isVentana = false) {
    let html = "";
    if (!isVentana) this.main.replaceChildren();


    html += `
    <div class="card shadow-lg">
      <div class="row g-0">`;

    //  botón que mostrar solo en la pantalla principal, no en la ventana
    if (!isVentana) {
      html += `<button class="btn btn-outline-success mb-3 newVentana"
     data-window-type="director" data-key="${director.name}_${director.lastname1}"
    >Mostrar en nueva ventana</button>`;
    }

    // Si hay foto se pondría aqui 
    html += `<div class="col-md-4">
          <img src="https://placehold.co/400x500?text=Foto+Director" class="img-fluid rounded-start h-100 object-fit-cover"
            alt="Foto director">
        </div>

        <!-- Los datos  -->
        <div class="col-md-8">
          <div class="card-body">

            <h2 class="card-title">
              ${director.name + " " + director.lastname1 + " " + director.lastname2}
            </h2>

            <p class="card-text">
              <strong>Fecha de nacimiento: </strong> ${director.born.toLocaleDateString()}
            </p>

            <hr>

            <!-- Producciones -->
            <h4>Producciones</h4>

            <div class="row">`;

    // Mostrar producciones
    for (const pro of productions) {
      html += `
              
              <div class="col-md-4 mb-4">
                <a href="#" class="produccion" data-key="${pro.title}">
                  <div class="card h-100">
                    <img src="https://placehold.co/300x400?text=${pro.image}" class="card-img-top" alt="Producción">
                    <div class="card-body">
                      <h6 class="card-title">${pro.title}</h6>
                    </div>
                  </div>
                </a>
              </div>

              `;
    }


    html += `</div>

          </div>
        </div>

      </div>
    </div>
    `;

    if (!isVentana) {

      this.main.insertAdjacentHTML('beforeend', html);
    } else {
      return html;
    }

  }

  /**
   * 
   * @param {*} handler 
   */
  bindShowFichaDirector(handler) {
    // escuchar en el nav
    this.nav.addEventListener("click", (event) => {
      // clase director
      const director = event.target.closest(".director");
      if (!director) return; // si no se crea continuar
      event.preventDefault();
      // guardar la key del director, desde atributo personalizado
      const keyDirector = director.querySelector("a").dataset.key;
      // obtener el objeto director y el array de producciones del director
      const datos = handler(keyDirector);
      // ejecutar función
      console.log("showDirector: " + datos.director);
      this.showFichaDirector(datos.director, datos.productions);

    });
    // escuchar también en el main 
    this.main.addEventListener("click", (event) => {
      // clase director
      const director = event.target.closest(".director");
      if (!director) return; // si no se crea continuar
      event.preventDefault();
      // guardar la key del director, desde atributo personalizado
      const keyDirector = director.querySelector("a").dataset.key;
      // obtener el objeto director y el array de producciones del director
      const datos = handler(keyDirector);
      // ejecutar función
      console.log("showDirector: " + datos.director);
      this.showFichaDirector(datos.director, datos.productions);

    });
  }

  /**
   * recibe el html, crea una nueva ventana y la devuelve
   * @param {*} html 
   */
  showMyWindow(html, key = null) {
    // Si ya existe una ventana para esta clave y sigue abierta, enfocarla.
    if (key && this.#ventanasAbiertas.has(key)) {
      const existe = this.#ventanasAbiertas.get(key);
      if (existe && !existe.closed) {
        existe.focus();
        return existe;
      }
      // Esa ventana ya se ha abierto, no se puede volver a abrir 
      this.#ventanasAbiertas.delete(key);
    }

    // usa la pagina auxPage.html con un esqueleto html vacio
    const mywindow = window.open("./auxPage.html", "_blank", "width=1000,height=600");

    if (!mywindow) {
      console.warn("No se pudo abrir la ventana: " + key);
      return null;
    }

    // Esperar a que la ventana cargue completamente
    mywindow.addEventListener("load", () => {
      const main = mywindow.document.getElementById("auxMainID");
      if (main) {
        // insertar el html de la ficha en la nueva pagina
        main.insertAdjacentHTML("beforeend", html);
        console.log("Ventana Abierta: " + key);
      }
    });

    // si no se ha abierto antes
    if (key) {
      this.#ventanasAbiertas.set(key, mywindow);
      // si se cierra la ventana borrar la clave
      mywindow.addEventListener("beforeunload", () => {
        if (this.#ventanasAbiertas.get(key) === mywindow) {
          console.log("Ventana cerrada: " + key);

          this.#ventanasAbiertas.delete(key);
        }
      });
    }

    return mywindow;
  }

  // Cerrar todas las ventanas
  closeWindows() {
    for (const [key, ventana] of this.#ventanasAbiertas.entries()) {
      if (ventana && !(ventana.closed)) {
        ventana.close();
      }
      this.#ventanasAbiertas.delete(key);
    }
  }





  // evento de carga de la página ejecutar el init, para ver datos
  bindLoad(handler) {
    window.addEventListener("DOMContentLoaded", handler, { once: true });// ejecutar solo una vez
  }



  // ver inicio, delegar evento, aun no esta creado el id Inicio, pero el nav si
  bindInit(handler) {
    // delegar eventos
    this.nav.addEventListener("click", (event) => {
      // busca en el nav el id inicio
      const inicio = event.target.closest("#inicio");
      if (inicio) {
        event.preventDefault();
        handler(); // ejecutar handler
        return; // detiene la ejecución y continua, para no seguir evaluando
      } // si no existe continuar ejecución

      const btnCerrar = event.target.closest("#btnCerrarVentanas");
      if (btnCerrar) {
        event.preventDefault();
        this.closeWindows(); // cerrar todas las ventanas
        return;
      }
    });

    // crear evento para cerrar ventanas
  }

  /**
   * devuelve un set con el número de producciones pasadas por parametro
   * @param {*} productions 
   * @param {*} numero 
   * @returns 
   */
  * getRandomProductions(productions, numero) {
    const array = Array.from(productions);
    const max = array.length;
    const set = new Set();
    //  si se ha introducido un número mal
    if (max === 0 || numero <= 0) return;

    // mientras el tamaño del set sea menos al tamaño buscado
    while (set.size < numero) {
      const aleatorio = Math.floor(Math.random() * max);
      const p = array[aleatorio];
      // si es nuevo añadirlo
      if (!set.has(p)) {
        set.add(p);
        yield p;
      }
    }
  }



}

// exportar clase
export default VideoSystemView;