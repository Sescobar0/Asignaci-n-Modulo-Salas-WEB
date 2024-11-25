const express = require("express"); // ¡Falta comillas en el código original!
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Ruta definida
ruta.get("/", (req, res) => {
  console.log("Ruta salasController!");
  res.send("¡Ruta salas alcanzada!");
});

module.exports = ruta;
