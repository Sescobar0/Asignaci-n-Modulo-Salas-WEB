const express = require("express");
const conexion = require("../DB/conexion"); // Ruta a tu archivo de conexión
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Crear una nueva reserva
ruta.post("/", (req, res) => {
  const {
    id_usuario,
    id_sala,
    fecha_inicio,
    fecha_fin,
    estado,
    motivo_cancelacion,
  } = req.body;

  if (!id_usuario || !id_sala || !fecha_inicio || !fecha_fin || !estado) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  const sql = `
    INSERT INTO reservas (id_usuario, id_sala, fecha_inicio, fecha_fin, estado, motivo_cancelacion) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  conexion.query(
    sql,
    [id_usuario, id_sala, fecha_inicio, fecha_fin, estado, motivo_cancelacion],
    (err, results) => {
      if (err) {
        console.error("Error al crear la reserva:", err);
        return res.status(500).send("Error al crear la reserva");
      }
      res.status(201).send({
        id_reserva: results.insertId,
        message: "Reserva creada con éxito",
      });
    }
  );
});

// Obtener todas las reservas
ruta.get("/", (req, res) => {
  const sql = "SELECT * FROM reservas";
  conexion.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener las reservas:", err);
      return res.status(500).send("Error al obtener las reservas");
    }
    res.send(results);
  });
});

// Obtener una reserva por ID
ruta.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM reservas WHERE id_reserva = ?";
  conexion.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener la reserva:", err);
      return res.status(500).send("Error al obtener la reserva");
    }
    if (results.length === 0) {
      return res.status(404).send("Reserva no encontrada");
    }
    res.send(results[0]);
  });
});

// Actualizar una reserva por ID
ruta.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    id_usuario,
    id_sala,
    fecha_inicio,
    fecha_fin,
    estado,
    motivo_cancelacion,
  } = req.body;

  const sql = `
    UPDATE reservas 
    SET id_usuario = ?, id_sala = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?, motivo_cancelacion = ?
    WHERE id_reserva = ?
  `;
  conexion.query(
    sql,
    [
      id_usuario,
      id_sala,
      fecha_inicio,
      fecha_fin,
      estado,
      motivo_cancelacion,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error("Error al actualizar la reserva:", err);
        return res.status(500).send("Error al actualizar la reserva");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Reserva no encontrada");
      }
      res.send({ message: "Reserva actualizada con éxito" });
    }
  );
});

// Eliminar una reserva por ID
ruta.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM reservas WHERE id_reserva = ?";
  conexion.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar la reserva:", err);
      return res.status(500).send("Error al eliminar la reserva");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Reserva no encontrada");
    }
    res.send({ message: "Reserva eliminada con éxito" });
  });
});

module.exports = ruta;
