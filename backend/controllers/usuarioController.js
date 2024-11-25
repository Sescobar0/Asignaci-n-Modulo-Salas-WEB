const express = require("express"); // ¡Falta comillas en el código original!
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Ruta definida
ruta.get("/", (req, res) => {
  console.log("Ruta usuarios!");
  res.send("¡Ruta usuarios alcanzada!");
});

module.exports = ruta;
