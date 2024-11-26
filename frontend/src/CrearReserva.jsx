import { useState } from "react";
import moment from "moment";
import "./crearReserva.css"; // Mantén tu archivo CSS personalizado

const CrearReserva = () => {
  const url = "http://localhost:3306/reservas"; // Ruta del backend
  const [values, setValues] = useState({
    fechaInicio: "",
    fechaFinal: "",
  });
  const [message, setMessage] = useState(""); // Para mostrar mensaje de éxito o error
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga

  // Función para limitar la hora mínima para reservar
  const obtenerFechaMinima = () => {
    const hoy = moment();
    hoy.set("hour", 7).set("minute", 0); // Hora mínima: 7:00 AM
    return hoy.format("YYYY-MM-DDTHH:mm");
  };

  // Función para limitar la hora máxima para reservar
  const obtenerFechaMaxima = () => {
    const hoy = moment();
    hoy.set("hour", 18).set("minute", 0); // Hora máxima: 6:00 PM
    return hoy.format("YYYY-MM-DDTHH:mm");
  };

  // Función para setear los valores iniciales
  const controlarCambios = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true); // Empieza a cargar

    // Asegurarnos de que las fechas sean convertidas al formato adecuado
    const fechaInicioFormateada = moment(values.fechaInicio).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const fechaFinalFormateada = moment(values.fechaFinal).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const data = {
      id_usuario: 1, // Esto es un ejemplo, debes pasarlo desde el estado o contexto de tu aplicación
      id_sala: 1, // Lo mismo que arriba, selecciona el ID de la sala
      fecha_inicio: fechaInicioFormateada,
      fecha_fin: fechaFinalFormateada,
      estado: "Confirmada", // O cualquier otro estado
      motivo_cancelacion: null, // O el motivo si aplica
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al registrar la reserva");
      }

      setMessage("Reserva registrada con éxito!");
      setValues({
        fechaInicio: "",
        fechaFinal: "",
      });
    } catch (error) {
      setMessage("Error al registrar la reserva");
    } finally {
      setLoading(false); // Termina de cargar
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h1>Registro de Reserva</h1>
        <form onSubmit={handleForm}>
          <div className="input-group">
            <label htmlFor="fechaInicio">Fecha de inicio de la reserva</label>
            <input
              type="datetime-local"
              name="fechaInicio"
              value={values.fechaInicio}
              onChange={controlarCambios}
              id="fechaInicio"
              placeholder="Fecha de inicio"
              min={obtenerFechaMinima()}
              max={obtenerFechaMaxima()}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="fechaFinal">Fecha final de la reserva</label>
            <input
              type="datetime-local"
              name="fechaFinal"
              value={values.fechaFinal}
              onChange={controlarCambios}
              id="fechaFinal"
              placeholder="Fecha final"
              min={values.fechaInicio || obtenerFechaMinima()}
              max={obtenerFechaMaxima()}
              required
            />
          </div>

          <div className="submit-container">
            <button type="submit" disabled={loading}>
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Registrar Reserva"
              )}
            </button>
          </div>
        </form>

        {/* Mensajes de estado de la reserva */}
        {message && (
          <div
            className={`alert mt-4 ${
              message.includes("éxito") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearReserva;
