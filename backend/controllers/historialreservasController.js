const express = require("express");
const conexion = require("../DB/conexion");
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Obtener todos los registros del historial
ruta.get("/", (req, res) => {
  const query = "SELECT * FROM historial_reservas";
  conexion.query(query, (err, resultados) => {
    if (err) {
      console.error("Error al obtener el historial:", err);
      res.status(500).send("Error al obtener el historial.");
    } else {
      res.status(200).send(resultados);
    }
  });
});

// Obtener un registro de historial por ID
ruta.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM historial_reservas WHERE id_historial = ?";
  conexion.query(query, [id], (err, resultados) => {
    if (err) {
      console.error("Error al obtener el historial:", err);
      res.status(500).send("Error al obtener el historial.");
    } else if (resultados.length === 0) {
      res.status(404).send("Historial no encontrado.");
    } else {
      res.status(200).send(resultados[0]);
    }
  });
});

module.exports = ruta;
