const express = require("express");
const conexion = require("../DB/conexion");
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Crear un nuevo recurso
ruta.post("/", (req, res) => {
  const { id_sala, nombre, descripcion } = req.body;
  const query =
    "INSERT INTO recursos_salas (id_sala, nombre, descripcion) VALUES (?, ?, ?)";
  conexion.query(query, [id_sala, nombre, descripcion], (err, resultado) => {
    if (err) {
      console.error("Error al insertar recurso:", err);
      res.status(500).send("Error al insertar recurso.");
    } else {
      res.status(201).send({
        id: resultado.insertId,
        mensaje: "Recurso creado exitosamente.",
      });
    }
  });
});

// Obtener todos los recursos
ruta.get("/", (req, res) => {
  const query = "SELECT * FROM recursos_salas";
  conexion.query(query, (err, resultados) => {
    if (err) {
      console.error("Error al obtener recursos:", err);
      res.status(500).send("Error al obtener recursos.");
    } else {
      res.status(200).send(resultados);
    }
  });
});

// Obtener un recurso por ID
ruta.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM recursos_salas WHERE id_recurso = ?";
  conexion.query(query, [id], (err, resultados) => {
    if (err) {
      console.error("Error al obtener el recurso:", err);
      res.status(500).send("Error al obtener el recurso.");
    } else if (resultados.length === 0) {
      res.status(404).send("Recurso no encontrado.");
    } else {
      res.status(200).send(resultados[0]);
    }
  });
});

// Actualizar un recurso por ID
ruta.put("/:id", (req, res) => {
  const { id } = req.params;
  const { id_sala, nombre, descripcion } = req.body;
  const query =
    "UPDATE recursos_salas SET id_sala = ?, nombre = ?, descripcion = ? WHERE id_recurso = ?";
  conexion.query(
    query,
    [id_sala, nombre, descripcion, id],
    (err, resultado) => {
      if (err) {
        console.error("Error al actualizar el recurso:", err);
        res.status(500).send("Error al actualizar el recurso.");
      } else if (resultado.affectedRows === 0) {
        res.status(404).send("Recurso no encontrado.");
      } else {
        res.status(200).send("Recurso actualizado exitosamente.");
      }
    }
  );
});

// Eliminar un recurso por ID
ruta.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM recursos_salas WHERE id_recurso = ?";
  conexion.query(query, [id], (err, resultado) => {
    if (err) {
      console.error("Error al eliminar el recurso:", err);
      res.status(500).send("Error al eliminar el recurso.");
    } else if (resultado.affectedRows === 0) {
      res.status(404).send("Recurso no encontrado.");
    } else {
      res.status(200).send("Recurso eliminado exitosamente.");
    }
  });
});

module.exports = ruta;
