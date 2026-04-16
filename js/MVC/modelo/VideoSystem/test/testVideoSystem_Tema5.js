"use strict";

// importar VideoSystem
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

// importar objetos de prueba
import {
  // categorias
  accion,
  drama,
  terror,
  romantica,
  comedia,
  // usuarios
  ataulfo,
  user2,
  user3,
  // productions
  elCuervo,
  silentHill,
  simpson,
  futurama,
  scaryMovie,
  // actores
  javier,
  penelope,
  // directores
  steven,
  alfred,
  scorsese,



} from "./testObjetosPrueba.js";

// función para probar funcionamiento de los metodos y patron flyweight
export default function testVideoSystem_Tema5() {
  console.log("-- tests VideoSystem Tema5 --");
  console.log("-->>>ESTE SCRIPT CREA INSTANCIAS PARA COMPROBAR QUE TODO ESTÁ OK--");
  console.log("--DESACTIVAR DESPUÉS DE LAS COMPROBACIONES--\n");

  // crear instancia Singleton
  const videoM = VideoSystem.getInstance();
  videoM.name = "VideoManager";

  console.log("\n");

  console.log("-Getter/Setter name: " + videoM.name + "\n");
  // addCategory()
  console.log("-addCategory: " + `${(videoM.addCategory(accion, drama, terror, romantica, comedia) == 6) ? "OK" : "NO OK"}`);
  // Getter categories
  let count = 0;
  for (const c of videoM.categories) count++;
  console.log("-Getter categories: " + `${(count === 6) ? "OK" : "NO OK"}`);
  // removeCategory()
  console.log("-removeCategory: " + `${(videoM.removeCategory(accion) === 5) ? "OK" : "NO OK"}`);

  // addUser()
  console.log("-addUser(): " + `${(videoM.addUser(ataulfo, user2, user3) == 3) ? "OK" : "NO OK"}`);
  // Getters users
  count = 0;
  for (const u of videoM.users) count++;
  console.log("-Getters users: " + `${(count == 3) ? "OK" : "NO OK"}`);
  // removerUser()
  // a partir de aqui
  console.log("-removeUser(): " + `${(videoM.removeUser(user3) === 2) ? "OK" : "NO OK"}`);

  // addProduction()
  console.log("-addProduction(): " + `${(videoM.addProduction(elCuervo, silentHill, simpson, futurama, scaryMovie) === 5) ? "OK" : "NO OK"}`);
  // Getters productions
  count = 0;
  for (const p of videoM.productions) count++;
  console.log("-Getters productions: " + `${(count === 5) ? "OK" : "NO OK"}`);
  // removeProduction
  console.log("-removeProduction(): " + `${(videoM.removeProduction(simpson) === 4) ? "OK" : "NO OK"}`);

  // addActor
  console.log("-addActor(): " + `${(videoM.addActor(javier, penelope) === 2) ? "OK" : "NO OK"}`);
  // Getters actors
  count = 0;
  for (const a of videoM.actors) count++;
  console.log("-Getters actors: " + `${(count === 2) ? "OK" : "NO OK"}`);
  // removeActor()
  console.log("-removeActor(): " + `${(videoM.removeActor(penelope) === 1) ? "OK" : "NO OK"}`);

  // addDirector()
  console.log("-addDirector(): " + `${(videoM.addDirector(steven, alfred, scorsese) === 3) ? "OK" : "NO OK"}`);
  // Getters directors
  count = 0;
  for (const d of videoM.directors) count++;
  console.log("-Getters directors" + `${(count === 3) ? "OK" : "NO OK"}`);
  // removeDirector
  console.log("-removeDirector(): " + `${(videoM.removeDirector(alfred) === 2) ? "OK" : "NO OK"}`);

  // assignCategory
  console.log("-assignCategory(Categoria, ...producciones): " + `${(videoM.assignCategory(terror, elCuervo, silentHill, simpson) === 3) ? "OK" : "NO OK"}`);
  // desasignCategory(Categoria, ...producciones)
  console.log("-desassignCategory(Categoria, ...producciones): " + `${(videoM.deassignCategory(terror, simpson) === 2) ? "OK" : "NO OK"}`);

  // assignDirector()
  console.log("-assignDirector(Director, ...producciones): " + `${(videoM.assignDirector(steven, futurama, scaryMovie, silentHill) === 3) ? "OK" : "NO OK"}`);
  // desassignDirector()
  console.log("-desassignDirector(Director, ...producciones): " + `${(videoM.deassignDirector(steven, futurama) === 2) ? "OK" : "NO OK"}`);

  // assignActor()
  console.log("-assignActor(Actor, ...producciones): " + `${(videoM.assignActor(javier, elCuervo, silentHill) === 2) ? "OK" : "NO OK"}`);
  // desassignActor()
  console.log("-desassignActor(Actor, ...producciones): " + `${(videoM.deassignActor(javier, silentHill) === 1) ? "OK" : "NO OK"}`);

  // getCast
  let salida = "";
  for (const actor of videoM.getCast(elCuervo)) {
    salida += actor.name + ", ";
  }
  console.log("-getCast(elCuervo): " + salida);

  // getProductionsDirector()
  salida = "";
  for (const produccion of videoM.getProductionsDirector(steven)) {
    salida += produccion.title + ", ";
  }
  console.log("-getProductionsDirector(steven): " + salida);

  // getProductionsActor()
  salida = "";
  for (const produccion of videoM.getProductionsActor(javier)) {
    salida += produccion.title + ", ";
  }
  console.log("-getProductionsActor(javier): " + salida);

  // getProductionsCategory()
  salida = "";
  for (const produccion of videoM.getProductionsCategory(terror)) {
    salida += produccion.title + ", ";
  }
  console.log("-getProductionsCategory(terror): " + salida);


  // createPerson()
  console.log("\n");
  console.log("-createPerson() si el objeto ya esta creado devuelve el mismo:\n");
  const person1 = videoM.createPerson("Juan", "Apellido", new Date(1991, 1, 1));
  const person2 = videoM.createPerson("Juan", "Apellido", new Date(1991, 1, 1));
  const person3 = videoM.createPerson("Maria", "Alegria", new Date(1992, 1, 1));

  console.log("const p1 = createPerson(\"Juan\",\"Apellido\",new Date(1991,1,1))");
  console.log("const p2 = createPerson(\"Juan\",\"Apellido\",new Date(1991,1,1))");
  console.log("const p3 = createPerson(\"Maria\",\"Alegria\",new Date(1992,1,1))");

  console.log("p1 === p2: " + `${person1 === person2}` + ": Se esperaba TRUE");
  console.log("p1 === p3: " + `${person1 === person3}` + ": Se esperaba FALSE");

  // createProduction()
  console.log("\n");
  console.log("-createProduction() si el objeto ya esta creado devuelve el mismo\n");

  const prod1 = videoM.createProduction("Spiderman 1", new Date(2000, 1, 1), "EEUU", "", "", [], [], 0);
  const prod2 = videoM.createProduction("Spiderman 1", new Date(2000, 1, 1), "EEUU", "", "", [], [], 0);
  const prod3 = videoM.createProduction("Batman vs Superman", new Date(2019, 1, 1), "EEUU", "", "", [], [], 0);

  console.log("const prod1 = createProduction(\"Spiderman 1\", new Date(2000, 1, 1), \"EEUU\", \"\", \"\", [], [], 0);");
  console.log("const prod2 = createProduction(\"Spiderman 1\", new Date(2000, 1, 1), \"EEUU\", \"\", \"\", [], [], 0);");
  console.log("const prod3 = createProduction(\"Batman vs Superman\", new Date(2019, 1, 1), \"EEUU\", \"\", \"\", [], [], 0);");

  console.log("prod1 === prod2: " + `${prod1 === prod2}` + ": Se esperaba TRUE");
  console.log("prod1 === prod3: " + `${prod1 === prod3}` + ": Se esperaba FALSE");

  // createUser()
  console.log("\n");
  console.log("-createUser()\n");

  const userr1 = videoM.createUser("Nancy", "nancy@gmail.com", "p455");
  const userr2 = videoM.createUser("Nancy", "nancy@gmail.com", "p455");
  const userr3 = videoM.createUser("Manolo", "manolo88@gmail.com", "contrasenia123");

  console.log("const userr1 = videoM.createUser(\"Nancy\", \"nancy@gmail.com\", \"p455\");");
  console.log("const userr1 = videoM.createUser(\"Nancy\", \"nancy@gmail.com\", \"p455\");");
  console.log("const userr3 = videoM.createUser(\"Manolo\", \"manolo88@gmail.com\", \"contrasenia123\");");

  console.log("userr1 === userr2 " + `${userr1 === userr2}` + ": Se esperaba TRUE");
  console.log("userr1 === userr3 " + `${userr1 === userr3}` + ": Se esperaba FALSE");

  // createCategory()
  console.log("\n");
  console.log("-createCategory()\n");

  const cate1 = videoM.createCategory("miedo");
  const cate2 = videoM.createCategory("miedo");
  const cate3 = videoM.createCategory("risas");

  console.log("const cate1 = videoM.createCategory(\"miedo\");");
  console.log("const cate2 = videoM.createCategory(\"miedo\");");
  console.log("const cate3 = videoM.createCategory(\"risas\");");

  console.log("cate1 === cate2: " + `${cate1 === cate2}` + ": Se esperaba TRUE");
  console.log("cate1 === cate3: " + `${cate1 === cate3}` + ": Se esperaba FALSE");

  // findProductions()
  console.log("\n");
  console.log("-findProductions()\n");
  // sin filtro
  console.log("sin filtro: todas las producciones");
  salida = "";
  for (const p of videoM.findProductions()) {
    salida += p.title + ", ";
  }
  console.log(salida);
  console.log("\n")
  // producciones de ESPAÑA
  console.log("con filtro: producciones de SPAIN: Se espera:  \"Scary Movie\" y \"Futurama\"");

  // definir filtro
  salida = "";
  for (const p of videoM.findProductions(
    (p) => { return p.nationality === "SPAIN" }, // filtro busqueda, nacionality Spain
    (a, b) => { return a.title.localeCompare(b.title) }) // filtro ordenación alfabeticamente
  ) {
    salida += p.title + ", ";
  }
  console.log(salida);

  // filterProductionsInCategory()
  console.log("\n");
  console.log("-filterProductionsInCategory(): \n");

  // crear datos
  const cat = videoM.createCategory("Ciencia Ficción"); // categoria
  const produ1 = videoM.createProduction( // produccion
    "Torrente presidente",
    new Date(2026, 2, 23), "SPAIN", "", "", [], [], 0
  );

  const produ2 = videoM.createProduction(
    "Jaula",
    new Date(2014, 2, 13), "SPAIN", "", "", [], [], 0
  );

  const produ3 = videoM.createProduction(
    "Enterrado",
    new Date(2010, 1, 1), "SPAIN", "", "", [], [], 0
  );

  // guardar en el Sistema
  videoM.addCategory(cat);
  videoM.addProduction(produ1, produ2, produ3);
  // asignar producciones a categoria
  videoM.assignCategory(cat, produ1, produ2, produ3);

  // probar metodo filterProductionsInCategory()
  salida = "";
  for (const p of videoM.filterProductionsInCategory(
    cat, // categoria
    (p) => { return p.nationality === "SPAIN" }, // filtro
    (a, b) => { return a.title.localeCompare(b.title) } // ordenación
  )) {
    salida += p.title + ", ";
  }
  console.log(salida);

}

