"use strict";


// importar clase Resource
import { Resource } from "../entities/Resource.js";

// función test
function testResource() {
  console.log("=> test Objeto Resource() <=\n");

  console.log("crear Objeto Resource");
  const nuevoResource = new Resource(120, "/root/videos/Pelicula.avi");
  console.dir(nuevoResource);
  console.log(nuevoResource.toString());

  // probar metodos get y set
  console.log("Probar metodos set y get");
  console.log(
    "set\n" +
    "nuevoResource.duration = 90;\n" +
    "nuevoResource.link = \"/home/Videos/Pelicula.avi\";"
  );
  nuevoResource.duration = 90;
  nuevoResource.link = "/home/Videos/Pelicula.avi";
  console.log(nuevoResource.toString());

  console.log("Probar excepción por poner un String en duration");
  console.log("nuevoResource.duration = \"200\";");
  try {
    nuevoResource.duration = "120";
  } catch (error) {
    console.error(error);
  }

  console.log("Probar metodos get");
  console.log(
    "Duration: " + nuevoResource.duration +
    "\nlink: " + nuevoResource.link
  );
}

export { testResource };