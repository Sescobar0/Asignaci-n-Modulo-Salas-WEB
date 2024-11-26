const express = require("express");
const cors = require("cors");

const router = express.Router(); // Crear el router primero

// Aplicar CORS al router
router.use(cors());

// Conectar el controlador al prefijo '/usuarios'
const usuariosController = require("../controllers/usuarioController"); // Importamos el controlador
router.use("/usuario", usuariosController);

// Conectar el controlador al prefijo '/salasController'
const salasController = require("../controllers/salasController"); // Importamos el controlador
router.use("/salas", salasController);

// Conectar el controlador al prefijo '/reservasController'
const reservasController = require("../controllers/reservasController"); // Importamos el controlador
router.use("/reservas", reservasController);

// Conectar el controlador al prefijo '/recursosController'
const recursosController = require("../controllers/recursosController"); // Importamos el controlador
router.use("/recursos", recursosController);

// Conectar el controlador al prefijo '/historialreservasController'
const historialreservasController = require("../controllers/historialreservasController"); // Importamos el controlador
router.use("/historialreservas", historialreservasController);

// Exportar el router para usarlo en otros archivos
module.exports = router;
