import React, { useState } from "react";

function CrearSala() {
  // Estados para gestionar los valores del formulario
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("disponible"); // Valor por defecto
  const [message, setMessage] = useState(""); // Para mostrar el mensaje de éxito o error

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const data = {
      nombre,
      capacidad,
      descripcion,
      estado,
    };

    try {
      const response = await fetch("http://localhost:3000/salas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear la sala");
      }

      const result = await response.json();
      setMessage(result.message || "Sala creada con éxito!");
      // Limpiar los valores del formulario
      setNombre("");
      setCapacidad("");
      setDescripcion("");
      setEstado("disponible");
    } catch (error) {
      setMessage(error.message || "Hubo un problema al crear la sala.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Registrar una nueva sala</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la Sala"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <select
            className="form-control"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Sala
        </button>
      </form>

      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div
          className={`alert mt-4 ${
            message.includes("con éxito") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default CrearSala;
