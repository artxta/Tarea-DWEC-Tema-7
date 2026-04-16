"use strict";

// importar clases
import { Serie } from "../entities/Serie.js";
import { Resource } from "../entities/Resource.js";
import { Coordinate } from "../entities/Coordinate.js";

// funcion de testeo
function testSerie() {
  console.log("=> Test Objeto Serie <=");

  console.log("Crear Objeto Serie");

  // array Resources
  const r1 = new Resource(130, "link de resource r1");
  const r2 = new Resource(120, "link de r2");
  const resources = [r1, r2];

  // array Coordinate
  const c1 = new Coordinate(23, 82);
  const c2 = new Coordinate(13, 72);
  const coordinate = [c1, c2];


  const newSerie = new Serie("FallOut", "EEUU", "01/01/2025",
    "se centra en un mundo postapocaliptico 200 años después de una guerra nuclear",
    "url(imagen.jpg)", resources, coordinate);

  console.dir(newSerie);
  console.log(newSerie.toString());

  console.log("Probar metodos setter");

  newSerie.title = "Futurama";
  newSerie.nationality = "Estados Unidos";
  newSerie.publication = new Date(1991, 2, 19);
  newSerie.synopsis = "nueva synopsis";
  newSerie.image = "imagenFuturama.jpg";
  newSerie.resources = [new Resource(123, "link")];
  newSerie.locations = [new Coordinate(1, 2)];
  newSerie.seasons = 13;

  console.log("se ha modoficado el objeto");

  // mostrar con metodos getter
  console.log("probar Getters");
  console.log(`Titulo: ${newSerie.title}
    Nacionalidad: ${newSerie.nationality}
    Fecha: ${newSerie.publication.toLocaleDateString()}
    Synopsis: ${newSerie.synopsis}
    Image: ${newSerie.image}
    Resources: ${newSerie.resources}
    Locations: ${newSerie.locations}
    Temporadas: ${newSerie.seasons}`);

}

// exportar función
export { testSerie };
