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
import AuthenticationService from "./authentication/authentication.js";

// crear instancia App
const vs = VideoSystem.getInstance();
const auth = AuthenticationService.getInstance();
const VideoSystemApp = new VideoSystemController(
  // crear instancia Singleton del modelo
  vs,
  // crear instancia de la Vista
  new VideoSystemView(),
  // importar authenticación
  auth,
);

// carga de datos inicial
VideoSystemApp.onLoad();

// exportar class
export default VideoSystemApp;