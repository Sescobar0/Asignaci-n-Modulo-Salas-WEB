const express = require("express");

const router = express.Router();

// Conectar el controlador al prefijo '/usuarios'
const usuariosController = require("../controllers/usuarioControler"); // Importamos el controlador
router.use("/usuario", usuariosController);

// Exportar el router para usarlo en otros archivos
module.exports = router;
