"use strict";

import {
  VideoSystem,
  Person,
  Category,
  Resource,
  Movie,
  Serie,
  User,
  Coordinate,

} from "../entities/VideoSystem.js";

// objetos

// categorias
const accion = new Category("Acción", "Categoria Acción");
const drama = new Category("Drama", "Categoria Drama");
const terror = new Category("Terror", "Categoria Terror");
const romantica = new Category("Romantica", "Categoria Romantica");
const comedia = new Category("Comedia", "Categoria Comedia");

// usuarios
const ataulfo = new User("Ataulfo", "afaulfo_71@gmail.com", "1234");
const user2 = new User("Santiago", "santi_@gmail.com", "pasS");
const user3 = new User("Capi", "cappii@gmail.com", "pass1234");

// production 
//Movie
const elCuervo = new Movie(
  "The Crow",
  new Date(2024, 0, 1),
  "EEUU",
  "Synopsis: trata de venganza",
  "El Cuervo.jpg",
  new Resource(120, "El Cuervo.mkv"),
  [new Coordinate(12, 12)]
);

const silentHill = new Movie(
  "Silent Hill",
  new Date(2006, 0, 1),
  "EEUU",
  "Una madre busca a su hija en silent hill",
  "SilentHill.jpg",
  new Resource(150, "SilentHill1.mkv"),
  [new Coordinate(13, 13)]
);

const simpson = new Serie(
  "Los simpsons",
  new Date(1989, 11, 17),
  "EEUU",
  "Los simpsons de toda la vida",
  "simsons.jpg",
  new Resource(30, "los Simpsons.mkv"),
  [new Coordinate(14, 14)],
  35
);

const futurama = new Serie(
  "Futurama",
  new Date(1999, 11, 31),
  "SPAIN",
  "Fry se congela y aparece en el futuro",
  "Futurama.jpg",
  new Resource(30, "futurama.mkv"),
  [new Coordinate(30, 30)],
  13
);

const scaryMovie = new Movie(
  "Scary Movie",
  new Date(2000, 0, 1),
  "SPAIN",
  "Una pelicula de miedo y humor",
  "ScaryMovie.jpg",
  new Resource(120, "ScaryMovie.torrent"),
  [new Coordinate(45, 90)]
);

// añadir Actores Objetos Person
const javier = new Person(
  "Javier",
  "Barden",
  new Date(1969, 2, 1),
  undefined,
  "JavierBarden.jpg"
);

const penelope = new Person(
  "Penelope",
  "Cruz",
  new Date(1974, 3, 28),
  undefined,
  "Penelope.jpg"
);

const steven = new Person(
  "Steven",
  "Spielverg",
  new Date(1946, 11, 18),
  undefined,
  "Steven.jpg"
);

const alfred = new Person(
  "Alfred",
  "Hitchcock",
  new Date(1899, 8, 13),
  undefined,
  "Alfred.jpg"
);

const scorsese = new Person(
  "Martin",
  "Scorsese",
  new Date(1942, 10, 17),
  undefined,
  "Martin.jpg"
);

export {
  accion,
  drama,
  terror,
  romantica,
  comedia,
  ataulfo,
  user2,
  user3,
  elCuervo,
  silentHill,
  simpson,
  futurama,
  scaryMovie,
  javier,
  penelope,
  steven,
  alfred,
  scorsese,
}