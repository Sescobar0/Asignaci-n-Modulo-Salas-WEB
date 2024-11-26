const express = require("express");
const conexion = require("../DB/conexion"); // Importa la conexión
const ruta = express.Router();

// Middleware para manejar JSON
ruta.use(express.json());

// Ruta para obtener todos los usuarios
ruta.get("/", (req, res) => {
  const query = "SELECT * FROM usuarios";
  conexion.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener los usuarios:", err.message);
      res.status(500).send("Error al obtener los usuarios.");
    } else {
      console.log("✅ Usuarios obtenidos correctamente.");
      res.json(results);
    }
  });
});

// Ruta para obtener un usuario por su ID
ruta.get("/:id", (req, res) => {
  const query = "SELECT * FROM usuarios WHERE id_usuario = ?";
  conexion.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener el usuario:", err.message);
      res.status(500).send("Error al obtener el usuario.");
    } else if (results.length === 0) {
      res.status(404).send("Usuario no encontrado.");
    } else {
      console.log("✅ Usuario obtenido correctamente.");
      res.json(results[0]);
    }
  });
});

// Ruta para agregar un nuevo usuario
ruta.post("/", (req, res) => {
  const { nombre, email, contrasena } = req.body; // Eliminamos 'rol'
  const query =
    "INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)";
  conexion.query(query, [nombre, email, contrasena], (err, results) => {
    if (err) {
      console.error("❌ Error al agregar el usuario:", err.message);
      res.status(500).send("Error al agregar el usuario.");
    } else {
      res.status(201).json({ message: "Usuario agregado correctamente." });
    }
  });
});

// Ruta para actualizar un usuario por su ID
ruta.put("/:id", (req, res) => {
  const { nombre, email, rol, contrasena } = req.body;
  const query =
    "UPDATE usuarios SET nombre = ?, email = ?, rol = ?, contrasena = ? WHERE id_usuario = ?";
  conexion.query(
    query,
    [nombre, email, rol, contrasena, req.params.id],
    (err, results) => {
      if (err) {
        console.error("❌ Error al actualizar el usuario:", err.message);
        res.status(500).send("Error al actualizar el usuario.");
      } else if (results.affectedRows === 0) {
        res.status(404).send("Usuario no encontrado.");
      } else {
        console.log("✅ Usuario actualizado correctamente.");
        res.send("Usuario actualizado correctamente.");
      }
    }
  );
});

// Ruta para eliminar un usuario por su ID
ruta.delete("/:id", (req, res) => {
  const query = "DELETE FROM usuarios WHERE id_usuario = ?";
  conexion.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("❌ Error al eliminar el usuario:", err.message);
      res.status(500).send("Error al eliminar el usuario.");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Usuario no encontrado.");
    } else {
      console.log("✅ Usuario eliminado correctamente.");
      res.send("Usuario eliminado correctamente.");
    }
  });
});

module.exports = ruta;
