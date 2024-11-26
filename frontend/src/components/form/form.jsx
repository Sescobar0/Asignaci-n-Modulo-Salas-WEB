// eslint-disable-next-line no-unused-vars
import React from "react";

function Formulario() {
  return (
    <>
      <div className="container mt-4">
        <h1>Registro de salas para la empresa NIDO</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Usuario_ID"
          required
        />
        <input
          type="number"
          className="form-control"
          placeholder="Sala_ID"
          min={1}
          max={1}
          required
        />
        <label>Fecha de inicio de la reserva</label>
        <input
          type="datetime-local"
          className="form-control"
          placeholder="Fecha de inicio"
          required
        />
        <label>Fecha de final de la reserva</label>
        <input
          type="datetime-local"
          className="form-control"
          placeholder="Fecha de final"
          required
        />
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
    </>
  );
}

export default Formulario;
