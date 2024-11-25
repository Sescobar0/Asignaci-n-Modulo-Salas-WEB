//conexion a MySQL
//se carga el paquete o llama a la dependencia​
const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistemanido",
});
// se abre la conexion a la BD​
conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la BD: " + err.message);
  } else {
    console.log("✅ Conexión exitosa a la base de datos sistemanido ");
  }
});
// se exporta para ser usada en cualquier parte del proyecto​
module.exports = conexion;
