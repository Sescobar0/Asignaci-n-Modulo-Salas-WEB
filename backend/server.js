const express = require("express");
const routes = require("./routes/routes"); // Importamos el archivo de rutas
const conexion = require("../backend/DB/conexion"); // Conexion a la DB

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Usar las rutas del archivo routes.js
app.use(routes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
