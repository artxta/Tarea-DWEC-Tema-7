"use strict";

import { Movie } from "../entities/Movie.js";
import { Resource } from "../entities/Resource.js";
import { Coordinate } from "../entities/Coordinate.js";

// función de prueba
function testMovie() {
  console.log("=> Test Objeto Movie <=");

  console.log("Crear objeto Movie");
  // crear objeto
  const newMovie = new Movie(
    "Alien",
    "Marciana",
    new Date(2000, 0, 1),
    "Un marciano viene de visita",
    "url(imagen.jpg)",
    new Resource(120, "/videos/Alien.avi"),
    [new Coordinate(12, 44), new Coordinate(0, 0)]
  );

  console.dir(newMovie);
  console.log(newMovie.toString());

  console.log("comprobar metodos set");

  console.log(
    "newMovie.title = \"La vuelta al mundo\";\n" +
    "newMovie.nationality = \"Española\";\n" +
    "newMovie.publication = new Date(2000, 0, 15);\n" +
    "newMovie.synopsis = \"Un hombre se va a dar la vuelta al mundo\";\n" +
    "newMovie.image = \"/archivos/imagen.avi\";\n"
  );
  // usar metodos setter
  newMovie.title = "La vuelta al mundo";
  newMovie.nationality = "Española";
  newMovie.publication = new Date(2000, 0, 15);
  newMovie.synopsis = "Un hombre se va a dar la vuelta al mundo";
  newMovie.image = "/archivos/imagen.avi";

  console.log(newMovie.toString());

  // usar metodos getter
  console.log(
    `metodos get: 
    Titulo: ${newMovie.title}
    Nacionalidad: ${newMovie.nationality}
    Fecha: ${newMovie.publication.toLocaleDateString()}
    Sypnosis: ${newMovie.synopsis}
    Imagen: ${newMovie.image}
    `
  );
}

export { testMovie }