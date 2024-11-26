import { useEffect, useState } from "react";
import "../views/misReservas.css";

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const url = "http://localhost:3000/reservas"; // URL del endpoint del backend

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtener reservas desde el backend al montar el componente
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener las reservas");
        }
        const data = await response.json();
        setReservas(data); // Guardamos las reservas en el estado
      } catch (err) {
        setError(err.message); // Manejar errores
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Mis Reservas</h1>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {reservas.length === 0 && !error && (
        <div className="alert alert-info">No hay reservas disponibles.</div>
      )}
      <div className="row">
        {reservas.map((reserva) => (
          <div key={reserva.id_reserva} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <p className="card-text">
                  <strong>Sala ID:</strong> {reserva.id_sala}
                </p>
                <p className="card-text">
                  <strong>Fecha Inicio:</strong>{" "}
                  {formatDate(reserva.fecha_inicio)}
                </p>
                <p className="card-text">
                  <strong>Fecha Fin:</strong> {formatDate(reserva.fecha_fin)}
                </p>
                <p
                  className={`card-text ${
                    reserva.estado === "Cancelada"
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  <strong>Estado:</strong> {reserva.estado}
                </p>
                {reserva.motivo_cancelacion && (
                  <p className="card-text">
                    <strong>Motivo de Cancelación:</strong>{" "}
                    {reserva.motivo_cancelacion}
                  </p>
                )}
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-outline-primary btn-sm">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisReservas;
