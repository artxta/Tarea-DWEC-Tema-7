"use strict";

import { Category } from "../entities/Category.js";

function testCategory() {
  console.log("=> Test Objeto Category <=");

  console.log("Crear objeto Category\n const nuevaCategory = new Category(");
  const nuevaCategory = new Category("Terror", "Peliculas que generan miedo");
  console.dir(nuevaCategory);
  console.log(nuevaCategory.toString());

  console.log(
    "Probar metodos set\n" +
    "nuevaCategory.name = \"Ciencia ficción\";\n" +
    "nuevaCategory.description = \"Peliculas de tecnología, del futuro\";\n");
  nuevaCategory.name = "Ciencia ficción";
  nuevaCategory.description = "Peliculas de tecnología, del futuro";

  console.log(nuevaCategory.toString());

  console.log(
    "Probar metodos get()\n" +
    nuevaCategory.name + "\n" +
    nuevaCategory.description
  );

}

export default testCategory;