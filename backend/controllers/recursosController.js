const express = require("express");
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Ruta definida
ruta.get("/", (req, res) => {
  console.log("Ruta recursosController!");
  res.send("¡Ruta recursos alcanzada!");
});

module.exports = ruta;
