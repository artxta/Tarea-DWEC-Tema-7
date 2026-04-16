"use strict";

// importar clase Production
import { Production } from "../entities/Production.js";

// function prueba
function testProduction() {
  console.log("=> testProduction <=");
  console.log("Comprobar que la clase no se puede instanciar");
  try {
    const claseAbstracta = new Production(
      "titulo",
      undefined,
      "01/01/2000",
      undefined,
      undefined);
  } catch (error) {
    console.error(error);
  }
}



export { testProduction };