"use strict";

// importar MVC
import {
  VideoSystem,
  // Category,
  // Coordinate,
  // Movie,
  // Person,
  // Production,
  // Resource,
  // Serie,
  // User

} from "./MVC/modelo/VideoSystem/entities/VideoSystem.js";


import VideoSystemView from "./MVC/VideoSystemView.js";
import VideoSystemController from "./MVC/VideoSystemController.js";

// crear instancia App
const vs = VideoSystem.getInstance();
const VideoSystemApp = new VideoSystemController(
  // crear instancia Singleton del modelo
  vs,
  // crear instancia de la Vista
  new VideoSystemView()
);

// Estructura de Datos de VideoSystem, tipo JSON

//  se han cambiado las fechas de new Date a tipo YYYY-MM-DD
const datos = {
  users: [
    {
      username: "Elon_musk_332",
      email: "elon_musk@hotmail.com",
      pass: "m1lm1ll000nario123"
    },
  ],

  categories: [
    {
      // Terror
      name: "Terror",
      description: "Peliculas que dan miedo.",
      productions: [
        {
          // La cosa
          title: "La Cosa",
          publication: "1982-06-25",
          nationality: "EEUU",
          synopsis: "Extraterrestres parasitos que cambiar de forma",
          image: "Cosa.jpg",
          actors: [
            // La cosa
            { name: "Kurt", lastname1: "Russel", born: "1962-06-25" },
            { name: "Wilford", lastname1: "Brimley", born: "1960-04-03" },
          ],
          directors: [
            // La cosa
            { name: "John", lastname1: "Carpenter", born: "1950-05-03" },
          ],
          resources: [
            { duration: "90", link: "pelicula_La_Cosa.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]

        },

        {
          // La mosca
          title: "La Mosca",
          publication: "1986-02-01",
          nationality: "EEUU",
          synopsis: "Un cientifico se utiliza como cobaya y se convierte en mosca",
          image: "La_Mosca.jpg",
          actors: [
            // La mosca
            { name: "Jeff", lastname1: "Goldblum", born: "1950-03-02" },
            { name: "Geena", lastname1: "Davis", born: "1950-04-02" },
          ],
          directors: [
            // La mosca
            { name: "David", lastname1: "Cronenberg", born: "1939-04-04" },
          ],
          resources: [
            { duration: "90", link: "La_Mosca.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Coraline
          title: "Coraline",
          publication: "2009-02-06",
          nationality: "CANADA",
          synopsis: "Pelicula de fantasia oscura",
          image: "Coraline.jpg",
          actors: [
            // Coraline
            { name: "Dakota", lastname1: "Fanning", born: "1969-01-01" },
            { name: "Teri", lastname1: "Hatcher", born: "1980-01-01" },
          ],
          directors: [
            // Coraline
            { name: "Henry", lastname1: "Selick", born: "1939-01-01" },
          ],
          resources: [
            { duration: "90", link: "Coraline.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Bitelchús
          title: "Bitelchús",
          publication: "1988-03-01",
          nationality: "EEUU",
          synopsis: "Un matrimonio de fantasmas contrata a bitelchus",
          image: "Bitelchus.jpg",
          actors: [
            // Bitelchus
            { name: "Michael", lastname1: "Keaton", born: "1949-04-04" },
            { name: "Winona", lastname1: "Ryder", born: "1980-05-02" },
          ],
          directors: [
            // bitelchus
            { name: "Tim", lastname1: "Burton", born: "1958-09-25" },
          ],
          resources: [
            { duration: "90", link: "Bitelchus.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // La novia Cadaver
          title: "La novia Cadaver",
          publication: "2005-12-10",
          nationality: "EEUU",
          synopsis: "Cuenta la historia de un muchacho virtuoso e inteligente llamado Victor Van Dort",
          image: "Novia_Cadaver.jpg",
          actors: [
            // La novia Cadaver
            { name: "John", lastname1: "Depp", born: "1963-10-05" },
            { name: "Helena", lastname1: "Bonham", born: "1966-05-26" },
          ],
          directors: [
            // La novia cadaver
            { name: "Tim", lastname1: "Burton", born: "1958-09-25" },
          ],
          resources: [
            { duration: "90", link: "Novia_Cadaver.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },

      ]
    },
    {
      // Comedia
      name: "Comedia",
      description: "Peliculas que dan risa.",
      productions: [
        // Comedia
        {
          // Dos tontos muy tontos
          title: "Los Simpsons",
          publication: "1989-02-01",
          nationality: "EEUU",
          synopsis: "Una familia de dibujos muy divertida",
          image: "Homer.jpg",
          seasons: 40,
          actors: [
            // Dos tontos muy tontos
            { name: "Jim", lastname1: "Carrey", born: "1962-01-17" },
            { name: "Jeff", lastname1: "Daniels", born: "1960-03-03" },
          ],
          directors: [
            // Dos tontos muy tontos
            { name: "Mat", lastname1: "Groening", born: "1949-03-03" },
          ],
          resources: [
            { duration: "90", link: "Los_Simpsons.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Algo pasa con Mary
          title: "Algo pasa con Mary",
          publication: "1998-04-01",
          nationality: "EEUU",
          synopsis: "Ted desea a la chica que todos desean",
          image: "Algo_pasa_mary.jpg",
          actors: [
            // Algo pasa con mary
            { name: "Cameron", lastname1: "Diaz", born: "1972-09-30" },
            { name: "Ben", lastname1: "Stiller", born: "1970-02-01" },
          ],
          directors: [
            // Algo pasa con mary
            { name: "Peter", lastname1: "Farrelly", born: "1949-03-03" }, // repetido
          ],
          resources: [
            { duration: "90", link: "Algo_pasa_mary.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Ave Ventura
          title: "Ace Ventura",
          publication: "1994-02-01",
          nationality: "EEUU",
          synopsis: "Ace Ventura detective de mascotas",
          image: "Ace_Ventura.jpg",
          actors: [
            // Ace ventura
            { name: "Jim", lastname1: "Carrey", born: "1962-01-17" }, // repetido
            { name: "Sean", lastname1: "Young", born: "1933-01-01" },
          ],
          directors: [
            // Ace Ventura
            { name: "Tom", lastname1: "Shadyac", born: "1960-02-01" },
          ],
          resources: [
            { duration: "90", link: "Ace_Ventura.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Al diablo con el diablo
          title: "Al diablo con el diablo",
          publication: "2000-02-01",
          nationality: "EEUU",
          synopsis: "Un joven se enamora de su compañera y vende su alma para conquistarla",
          image: "Al_Diablo.jpg",
          actors: [
            // Al diablo con el diablo
            { name: "Brendan", lastname1: "Fraser", born: "1939-03-02" },
            { name: "Elizabeth", lastname1: "Hurley", born: "1970-01-01" },
          ],
          directors: [
            // Al diablo con el diablo
            { name: "Harold", lastname1: "Ramis", born: "1939-02-01" },
          ],
          resources: [
            { duration: "90", link: "Al_Diablo.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
      ]
    },
    {
      name: "Ciencia Ficción",
      description: "Pelicula que imagina futuros diferentes.",
      productions: [
        // Ciencia Ficción
        {
          // Pactor con el Diablo
          title: "Pactar con el Diablo",
          publication: "1997-02-01",
          nationality: "EEUU",
          synopsis: "Un abogado muy bueno es contratado por el diablo",
          image: "PactarDiablo.jpg",
          actors: [
            // Pactar con el diablo
            { name: "Keanu", lastname1: "Reeves", born: "1964-09-02" },
            { name: "Al", lastname1: "Pacino", born: "1939-04-03" },
          ],
          directors: [
            // Pactar con el diablo
            { name: "Taylor", lastname1: "Hackford", born: "1939-03-02" },
          ],
          resources: [
            { duration: "90", link: "Pactar_Con_Diablo.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]

        },
        {
          // John Wick
          title: "John Wick",
          publication: "2014-02-01",
          nationality: "EEUU",
          synopsis: "John Wick Era un huérfano que fue acogido por el sindicato del crimen Ruska Roma, donde fue criado como un asesino, y finalmente se convirtió en el principal ejecutor de la mafia rusa,",
          image: "JohnWick.jpg",
          actors: [
            { name: "Keanu", lastname1: "Reeves", born: "1964-09-02" },
            { name: "Brendan", lastname1: "Fraser", born: "1939-03-02" },

          ],
          directors: [
            { name: "Chad", lastname1: "Stahelski", born: "1960-03-02" },
          ],
          resources: [
            { duration: "90", link: "JohnWick.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Matrix
          title: "Matrix",
          publication: "1999-12-31",
          nationality: "EEUU",
          synopsis: "El futuro tras una guerra con las maquinas",
          image: "Matrix.jpg",
          actors: [
            // Matrix
            { name: "Keanu", lastname1: "Reeves", born: "1964-09-02" },
            { name: "Laurence", lastname1: "Fishburne", born: "1950-03-02" },
          ],
          directors: [
            // Matrix
            { name: "Hermanas", lastname1: "Wachowski", born: "1959-02-01" },
          ],
          resources: [
            { duration: "90", link: "Matrix.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]

        },
        {
          // The Terminator
          title: "The Terminator",
          publication: "1984-02-01",
          nationality: "EEUU",
          synopsis: "Un robot va buscando a Sara Conor toda la pelicula",
          image: "TheTerminator.jpg",
          actors: [
            // Terminator
            { name: "Arnold", lastname1: "Schwarzenegger", born: "1969-03-02" },
            { name: "Linda", lastname1: "Hamilton", born: "1970-03-02" },
          ],
          directors: [
            // the terminator
            { name: "James", lastname1: "Cameron", born: "1970-04-03" },
          ],
          resources: [
            { duration: "90", link: "Terminator.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Desafio Total
          title: "Desafio Total",
          publication: "1990-02-01",
          nationality: "EEUU",
          synopsis: "Un Espia que no sabe que lo es viaja a Marte",
          image: "DesafioTotal.jpg",
          actors: [
            // Desafio Total
            { name: "Arnold", lastname1: "Schwarzenegger", born: "1969-03-02" },
            { name: "Rachel", lastname1: "Ticotin", born: "1970-02-01" },
          ],
          directors: [
            // Desafio Total
            { name: "Paul", lastname1: "Verhoeven", born: "1990-02-01" },
          ],
          resources: [
            { duration: "90", link: "Desafio_Total.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
        {
          // Instinto Basico
          title: "Instinto Básico",
          publication: "1992-02-01",
          nationality: "EEUU",
          synopsis: "Al comienzo, Johnny Boz, una estrella del rock retirada, está haciendo el amor con una rubia, y ella lo mata, inmovilizándole primero",
          image: "Instinto.jpg",
          actors: [
            { name: "Sharon", lastname1: "Stone", born: "1958-03-10" },
            { name: "Michael", lastname1: "Douglas", born: "1944-09-15" },
          ],
          directors: [
            { name: "Paul", lastname1: "Verhoeven", born: "1990-02-01" },
          ],
          resources: [
            { duration: "90", link: "pelicula_Instinto.avi" },
          ],
          locations: [
            { latitude: "37.99", longitude: "-1.15" },
          ]
        },
      ]
    },
  ],
};

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

// Carga de datos inicial

VideoSystemApp.onLoad(datos);

// exportar class
export default VideoSystemApp;