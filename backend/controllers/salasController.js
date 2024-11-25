const express = require("express");
const conexion = require("../DB/conexion"); // Asegúrate de que la ruta sea correcta.
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Crear una nueva sala
ruta.post("/", (req, res) => {
  const { nombre, capacidad, descripcion, estado } = req.body;

  if (!nombre || !capacidad || !estado) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  const sql =
    "INSERT INTO salas (nombre, capacidad, descripcion, estado) VALUES (?, ?, ?, ?)";
  conexion.query(
    sql,
    [nombre, capacidad, descripcion, estado],
    (err, results) => {
      if (err) {
        console.error("Error al insertar la sala:", err);
        return res.status(500).send("Error al crear la sala");
      }
      res
        .status(201)
        .send({ id_sala: results.insertId, message: "Sala creada con éxito" });
    }
  );
});

// Obtener todas las salas
ruta.get("/", (req, res) => {
  const sql = "SELECT * FROM salas";
  conexion.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener las salas:", err);
      return res.status(500).send("Error al obtener las salas");
    }
    res.send(results);
  });
});

// Obtener una sala por ID
ruta.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM salas WHERE id_sala = ?";
  conexion.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener la sala:", err);
      return res.status(500).send("Error al obtener la sala");
    }
    if (results.length === 0) {
      return res.status(404).send("Sala no encontrada");
    }
    res.send(results[0]);
  });
});

// Actualizar una sala por ID
ruta.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, descripcion, estado } = req.body;

  const sql =
    "UPDATE salas SET nombre = ?, capacidad = ?, descripcion = ?, estado = ? WHERE id_sala = ?";
  conexion.query(
    sql,
    [nombre, capacidad, descripcion, estado, id],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar la sala:", err);
        return res.status(500).send("Error al actualizar la sala");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Sala no encontrada");
      }
      res.send({ message: "Sala actualizada con éxito" });
    }
  );
});

// Eliminar una sala por ID
ruta.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM salas WHERE id_sala = ?";
  conexion.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar la sala:", err);
      return res.status(500).send("Error al eliminar la sala");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Sala no encontrada");
    }
    res.send({ message: "Sala eliminada con éxito" });
  });
});

module.exports = ruta;
