"use strict";

// importar clase
import { User } from "../entities/User.js";

// función para prueba clase User

function testUser() {
  console.log("=> Test Objeto User <=");

  console.log("Crear Objeto User");

  const newUser = new User("Alfonso", "alfonso@gmail.com", "Aa123456A");
  console.dir(newUser);

  console.log(newUser.toString());

  // metodos set
  console.log("Metodos setter");

  newUser.username = "Alvaro";
  newUser.email = "alvaro@gmail.com";
  newUser.password = "p4ssw0RD";

  console.log("asignados nuevos atributos con setters");
  console.log("comprobar metodos getters");
  console.log(
    `Username: ${newUser.username}
    Email: ${newUser.email}
    Password: ${newUser.password}`
  );

}

// exportar clase
export { testUser };