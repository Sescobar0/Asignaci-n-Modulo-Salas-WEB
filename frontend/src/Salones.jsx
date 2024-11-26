// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import sala1 from "./assets/img/sala1.jpg";
import sala2 from "./assets/img/sala2.jpg";
import sala3 from "./assets/img/sala3.jpg";
import sala4 from "./assets/img/sala4.jpg";
import sala5 from "./assets/img/sala5.jpg";
import sala6 from "./assets/img/sala6.jpeg";

function Salones() {
  const [salones, setSalones] = useState([]);
  const imagenes = [sala1, sala2, sala3, sala4, sala5,sala6];

  //hacer una petición a la DB
  useEffect(() => {
    fetch('http://localhost:3000/salas')
      .then((response) => response.json())
      .then((data) => setSalones(data))
      .catch((error) => console.error("Error al obtener salones:", error));
  }, []);


  return (
    <div className="container-fluid">
      <div className="row">
        {salones.map((salon, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                className="card-img-top"
                src={imagenes[index]}
                alt={`Sala ${index + 1}`}
                height={300}
              />
              <div className="card-body">
                <h1 className="card-title">Sala {index + 1}</h1>
                <p className="card-subtitle">
                  Sala de trabajos, reuniones, desarrollo y entretenimiento. Reserva para hacerlo más divertido.
                </p>
                <div className="d-grid gap-2">
                  <Link to="/crearReserva"
                    className={`btn my-2 p-3 ${salon.estado === "disponible" ? "btn-success" : "btn-danger"
                  }`}
                    role="button"
                    style={{ pointerEvents: salon.estado !== "disponible" ? "none" : "auto" }}
                  >
                    {salon.estado === "disponible" ? "Disponible" : "Reservada"}
                  </Link>
                </div>
                <div
                  className={`alert ${salon.estado === "disponible"
                      ? "alert-success"
                      : "alert-danger"
                    }`}
                  role="alert"
                >
                  {salon.estado === "disponible" ? "Disponible" : "Reservada"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salones;
